#!/usr/bin/env python3
"""Verify the Scryfall Maze Master workbook as immutable source evidence.

This script intentionally lives outside runtime Maze code. It parses the source
workbook, inventories records, optionally refreshes bounded Scryfall evidence,
and writes machine-readable reports under docs/research.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
import xml.etree.ElementTree as ET


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_WORKBOOK = REPO_ROOT / "docs/research/maze-player-language/source/Scryfall_Maze_Master.xlsx"
OUTPUT_DIR = REPO_ROOT / "docs/research/maze-player-language/verification/vm577"
GROUNDING_PATH = REPO_ROOT / "data/scryfall/grounding/scryfall-grounding.json"
SEMANTICS_PATH = REPO_ROOT / "data/scryfall/grounding/plain-reading-semantics.json"

NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pkgrel": "http://schemas.openxmlformats.org/package/2006/relationships",
}

CONTROLLED_DISPOSITIONS = {
    "VERIFIED_NATIVE",
    "VERIFIED_QUERY",
    "VERIFIED_TAG",
    "VERIFIED_INTERNAL",
    "SEMANTIC_REVIEW",
    "AMBIGUOUS",
    "UNVERIFIED",
    "STALE",
    "INVALID",
    "SOURCE_ARTIFACT",
}

NATIVE_CATALOG_ENDPOINTS = {
    "card-types": "/catalog/card-types",
    "supertypes": "/catalog/supertypes",
    "creature-types": "/catalog/creature-types",
    "artifact-types": "/catalog/artifact-types",
    "enchantment-types": "/catalog/enchantment-types",
    "land-types": "/catalog/land-types",
    "planeswalker-types": "/catalog/planeswalker-types",
    "spell-types": "/catalog/spell-types",
    "keyword-abilities": "/catalog/keyword-abilities",
    "keyword-actions": "/catalog/keyword-actions",
    "ability-words": "/catalog/ability-words",
}

NATIVE_CATEGORY_HINTS = {
    "creature type": "creature-types",
    "creature types": "creature-types",
    "card type": "card-types",
    "card types": "card-types",
    "supertype": "supertypes",
    "supertypes": "supertypes",
    "artifact type": "artifact-types",
    "enchantment type": "enchantment-types",
    "land type": "land-types",
    "planeswalker type": "planeswalker-types",
    "spell type": "spell-types",
    "keyword ability": "keyword-abilities",
    "keyword abilities": "keyword-abilities",
    "keyword action": "keyword-actions",
    "keyword actions": "keyword-actions",
    "ability word": "ability-words",
    "ability words": "ability-words",
}

VALID_STATUSES = {
    "production-ready",
    "production ready",
    "production",
    "review",
    "semantic",
    "experimental",
    "draft",
    "deprecated",
    "governed",
    "candidate",
    "correct",
    "normalize",
    "remove",
    "tag-dependent",
}

SEMANTIC_HINTS = (
    "archetype",
    "player",
    "plain language",
    "semantic",
    "context",
    "identity",
    "deck",
    "qa",
    "evaluation",
    "recipe",
)

SOURCE_ARTIFACT_TERMS = {
    "ability word",
    "keyword ability",
    "keyword action",
    "creature type",
    "card type",
    "artifact type",
    "enchantment type",
    "land type",
    "planeswalker type",
    "spell type",
    "tagger tags",
    "scryfall operators",
}

TAG_PATTERN = re.compile(r"\b(?P<prefix>o?tag|atag|arttag|oracletag|function):(?P<tag>[a-z0-9][a-z0-9_-]*)\b", re.I)


@dataclass
class Cell:
    value: Any = None
    formula: str | None = None
    error: str | None = None


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest().upper()


def normalize_term(value: Any) -> str:
    text = "" if value is None else str(value)
    text = text.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"')
    text = re.sub(r"\s+", " ", text.strip().lower())
    return text


def stable_slug(value: Any) -> str:
    return re.sub(r"[^a-z0-9]+", "-", normalize_term(value)).strip("-")


def col_to_index(ref: str) -> int:
    letters = re.match(r"[A-Z]+", ref.upper())
    if not letters:
        return 0
    value = 0
    for ch in letters.group(0):
        value = value * 26 + (ord(ch) - 64)
    return value - 1


def load_shared_strings(zf: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    strings = []
    for si in root.findall("main:si", NS):
        strings.append("".join(t.text or "" for t in si.findall(".//main:t", NS)))
    return strings


def workbook_sheets(zf: zipfile.ZipFile) -> list[tuple[str, str]]:
    workbook = ET.fromstring(zf.read("xl/workbook.xml"))
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels.findall("pkgrel:Relationship", NS)}
    sheets = []
    for sheet in workbook.findall("main:sheets/main:sheet", NS):
        name = sheet.attrib["name"]
        rid = sheet.attrib[f"{{{NS['rel']}}}id"]
        target = rel_map[rid].lstrip("/")
        if not target.startswith("xl/"):
            target = f"xl/{target}"
        sheets.append((name, target))
    return sheets


def parse_cell(cell_node: ET.Element, shared: list[str]) -> Cell:
    ctype = cell_node.attrib.get("t", "")
    formula_node = cell_node.find("main:f", NS)
    value_node = cell_node.find("main:v", NS)
    formula = formula_node.text if formula_node is not None else None
    raw = value_node.text if value_node is not None else None
    error = None
    value: Any = raw
    if ctype == "s" and raw is not None:
        idx = int(raw)
        value = shared[idx] if idx < len(shared) else raw
    elif ctype == "inlineStr":
        value = "".join(t.text or "" for t in cell_node.findall(".//main:t", NS))
    elif ctype == "b" and raw is not None:
        value = raw == "1"
    elif ctype == "e":
        error = raw
        value = raw
    elif raw is not None and re.fullmatch(r"-?\d+(\.\d+)?", raw):
        value = float(raw) if "." in raw else int(raw)
    return Cell(value=value, formula=formula, error=error)


def read_xlsx(path: Path) -> dict[str, Any]:
    with zipfile.ZipFile(path) as zf:
        shared = load_shared_strings(zf)
        result = {"sheets": []}
        for sheet_name, target in workbook_sheets(zf):
            root = ET.fromstring(zf.read(target))
            dimension = root.find("main:dimension", NS)
            rows: list[list[Cell]] = []
            formula_count = 0
            error_count = 0
            for row_node in root.findall("main:sheetData/main:row", NS):
                row_cells: dict[int, Cell] = {}
                for cnode in row_node.findall("main:c", NS):
                    ref = cnode.attrib.get("r", "")
                    parsed = parse_cell(cnode, shared)
                    row_cells[col_to_index(ref)] = parsed
                    if parsed.formula:
                        formula_count += 1
                    if parsed.error:
                        error_count += 1
                width = max(row_cells.keys(), default=-1) + 1
                rows.append([row_cells.get(i, Cell()) for i in range(width)])
            result["sheets"].append(
                {
                    "name": sheet_name,
                    "dimension": dimension.attrib.get("ref", "") if dimension is not None else "",
                    "rows": rows,
                    "formula_count": formula_count,
                    "error_count": error_count,
                }
            )
        return result


def best_header_row(rows: list[list[Cell]]) -> int | None:
    header_terms = (
        "source",
        "category",
        "term",
        "archetype",
        "status",
        "confidence",
        "query",
        "syntax",
        "input",
        "expected",
        "eval",
        "phrase",
        "canonical",
        "alias",
        "production",
        "guardrail",
    )
    best: tuple[int, int] | None = None
    for i, row in enumerate(rows[:12]):
        values = [normalize_term(cell.value) for cell in row if normalize_term(cell.value)]
        if not values:
            continue
        keyword_score = sum(5 for value in values for term in header_terms if term in value)
        score = len(values) + keyword_score
        if len(values) < 2:
            score -= 10
        if best is None or score > best[1]:
            best = (i, score)
    if best:
        return best[0]
    for i, row in enumerate(rows):
        if any(normalize_term(cell.value) for cell in row):
            return i
    return None


def unique_headers(values: list[Any]) -> list[str]:
    seen: Counter[str] = Counter()
    headers = []
    for idx, value in enumerate(values):
        base = str(value).strip() if value not in (None, "") else f"Column {idx + 1}"
        seen[base] += 1
        headers.append(base if seen[base] == 1 else f"{base} {seen[base]}")
    return headers


def find_col(headers: list[str], *patterns: str) -> str | None:
    lowered = [(header, normalize_term(header)) for header in headers]
    for pat in patterns:
        rx = re.compile(pat, re.I)
        for original, lowered_header in lowered:
            if rx.search(lowered_header):
                return original
    return None


def extract_records(workbook: dict[str, Any]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    records: list[dict[str, Any]] = []
    inventory: list[dict[str, Any]] = []
    for sheet in workbook["sheets"]:
        rows = sheet["rows"]
        header_idx = best_header_row(rows)
        headers: list[str] = []
        if header_idx is not None:
            header_cells = rows[header_idx]
            headers = unique_headers([cell.value for cell in header_cells])
            for physical_idx, row in enumerate(rows[header_idx + 1 :], start=header_idx + 2):
                values = {headers[i] if i < len(headers) else f"Column {i + 1}": row[i].value for i in range(len(row))}
                if not any(normalize_term(v) for v in values.values()):
                    continue
                formulas = {headers[i] if i < len(headers) else f"Column {i + 1}": row[i].formula for i in range(len(row)) if row[i].formula}
                errors = {headers[i] if i < len(headers) else f"Column {i + 1}": row[i].error for i in range(len(row)) if row[i].error}
                records.append({"sheet": sheet["name"], "row_number": physical_idx, "values": values, "formulas": formulas, "errors": errors})
        nonempty = sum(1 for row in rows if any(normalize_term(c.value) for c in row))
        inventory.append(
            {
                "sheet": sheet["name"],
                "dimension": sheet["dimension"],
                "nonempty_rows": nonempty,
                "header_row": None if header_idx is None else header_idx + 1,
                "headers": headers,
                "formula_count": sheet["formula_count"],
                "error_count": sheet["error_count"],
            }
        )
    return records, inventory


def record_field(record: dict[str, Any], field: str) -> Any:
    values = record["values"]
    headers = list(values.keys())
    if field == "id":
        col = find_col(headers, r"^(record )?id$", r"\bkey\b")
    elif field == "term":
        col = find_col(headers, r"\bnormalized\b.*\bterm\b", r"\bterm\b", r"\bdata point\b", r"\btrigger", r"\bphrase\b", r"\balias\b", r"\blabel\b", r"\bcanonical syntax\b", r"\bexact tag\b", r"\boperator\b", r"\btag\b", r"\barchetype\b", r"\bplain-language input\b", r"\binput\b", r"\bquery\b")
    elif field == "normalized":
        col = find_col(headers, r"\bnormalized\b")
    elif field == "category":
        col = find_col(headers, r"\bcategory\b", r"\bclass\b", r"^type$")
    elif field == "status":
        col = find_col(headers, r"\bstatus\b", r"\bstate\b", r"\bmaster status\b", r"\bproduction status\b")
    elif field == "confidence":
        col = find_col(headers, r"\bconfidence\b", r"\bscore\b")
    elif field == "mapping":
        col = find_col(headers, r"\bscryfall\b.*\b(output|fragment|query|syntax)\b", r"\bmaster query fragment\b", r"\bpreferred query\b", r"\bcanonical query\b", r"\bquery template\b", r"\boutput\b", r"\bfragment\b", r"\bmapping\b", r"\bsyntax\b", r"\bexpected canonical query\b")
    elif field == "expected":
        col = find_col(headers, r"\bexpected\b")
    else:
        col = None
    return values.get(col) if col else None


def normalized_record_key(record: dict[str, Any]) -> str:
    explicit = record_field(record, "normalized")
    term = explicit if normalize_term(explicit) else record_field(record, "term")
    return normalize_term(term)


def workbook_record_id(record: dict[str, Any]) -> str:
    raw = record_field(record, "id")
    if normalize_term(raw):
        return str(raw)
    return f"{stable_slug(record['sheet'])}-R{record['row_number']}"


def classify_source_artifact(term: str, category: str = "") -> bool:
    normalized = normalize_term(term)
    normalized_category = normalize_term(category)
    if normalized in SOURCE_ARTIFACT_TERMS:
        return True
    if normalized and normalized == normalized_category and normalized in NATIVE_CATEGORY_HINTS:
        return True
    return False


def confidence_issue(value: Any) -> str | None:
    text = normalize_term(value)
    if not text:
        return None
    try:
        num = float(str(value).strip().rstrip("%"))
        if "%" in str(value):
            num = num / 100
        if not 0 <= num <= 1:
            return "confidence outside 0..1"
    except ValueError:
        if text not in {"low", "medium", "high", "experimental", "review"}:
            return "non-numeric confidence"
    return None


def load_local_grounding() -> dict[str, set[str]]:
    if not GROUNDING_PATH.exists():
        return {}
    data = json.loads(GROUNDING_PATH.read_text(encoding="utf-8"))
    catalogs: dict[str, set[str]] = {}
    raw_catalogs = data.get("catalogs", {})
    key_map = {
        "abilityWords": "ability-words",
        "artifactTypes": "artifact-types",
        "cardTypes": "card-types",
        "creatureTypes": "creature-types",
        "enchantmentTypes": "enchantment-types",
        "keywordAbilities": "keyword-abilities",
        "keywordActions": "keyword-actions",
        "landTypes": "land-types",
        "planeswalkerTypes": "planeswalker-types",
        "spellTypes": "spell-types",
        "supertypes": "supertypes",
    }
    for key, values in raw_catalogs.items():
        if isinstance(values, list):
            catalogs[key_map.get(key, key)] = {normalize_term(v) for v in values}
    return catalogs


def http_json(url: str, timeout: int = 20) -> dict[str, Any]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "VoxManaMazeKnowledgeVerifier/1.0 (https://voxmana.io; bounded research verification)",
            "Accept": "application/json;q=0.9,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        payload = response.read()
        return json.loads(payload.decode("utf-8"))


def fetch_scryfall_catalogs(cache_dir: Path, allow_network: bool) -> dict[str, Any]:
    cache_dir.mkdir(parents=True, exist_ok=True)
    snapshot_path = cache_dir / "scryfall-catalog-snapshot.json"
    if not allow_network and snapshot_path.exists():
        return json.loads(snapshot_path.read_text(encoding="utf-8"))
    if not allow_network:
        return {"source": "local-grounding", "retrieved_at": None, "catalogs": {k: sorted(v) for k, v in load_local_grounding().items()}, "network": "disabled"}

    catalogs: dict[str, Any] = {}
    errors: dict[str, str] = {}
    for key, endpoint in NATIVE_CATALOG_ENDPOINTS.items():
        url = f"https://api.scryfall.com{endpoint}"
        try:
            payload = http_json(url)
            catalogs[key] = payload.get("data", [])
            time.sleep(0.35)
        except Exception as exc:  # network failures are evidence limitations, not semantic failures
            errors[key] = f"{type(exc).__name__}: {exc}"
    snapshot = {
        "source": "https://api.scryfall.com",
        "retrieved_at": now_iso(),
        "catalogs": catalogs,
        "errors": errors,
        "hash": hashlib.sha256(json.dumps(catalogs, sort_keys=True).encode("utf-8")).hexdigest().upper(),
    }
    snapshot_path.write_text(json.dumps(snapshot, indent=2, sort_keys=True), encoding="utf-8")
    return snapshot


def category_catalog_key(category: str, sheet: str = "") -> str | None:
    haystack = f"{normalize_term(category)} {normalize_term(sheet)}"
    for hint, key in NATIVE_CATEGORY_HINTS.items():
        if hint in haystack:
            return key
    return None


def classify_native(term: str, category: str, sheet: str, catalogs: dict[str, Any]) -> tuple[str | None, str, str | None]:
    key = category_catalog_key(category, sheet)
    if not key:
        return None, "", None
    if key not in catalogs:
        return "UNVERIFIED", f"Scryfall catalog {key} was unavailable; cannot classify as stale or current.", None
    values = {normalize_term(v): v for v in catalogs.get(key, [])}
    normalized = normalize_term(term)
    if normalized in values:
        return "VERIFIED_NATIVE", f"Exact match in Scryfall catalog {key}", values[normalized]
    return "STALE", f"No exact match in Scryfall catalog {key}", None


def classify_operator_probe_result(result: dict[str, Any]) -> str:
    if result.get("network_error"):
        return "UNVERIFIED"
    if int(result.get("status") or 0) == 429:
        return "UNVERIFIED"
    if result.get("status") and int(result["status"]) >= 400:
        return "INVALID"
    if result.get("accepted") and isinstance(result.get("total_cards"), int):
        return "VERIFIED_QUERY"
    return "UNVERIFIED"


def classify_tagger_probe_result(result: dict[str, Any]) -> str:
    if result.get("network_error"):
        return "UNVERIFIED"
    if int(result.get("status") or 0) == 429:
        return "UNVERIFIED"
    if result.get("status") and int(result["status"]) >= 400:
        return "STALE"
    if result.get("accepted") and int(result.get("total_cards") or 0) > 0:
        return "VERIFIED_TAG"
    return "UNVERIFIED"


def extract_tags(text: str) -> list[dict[str, str]]:
    tags = []
    for match in TAG_PATTERN.finditer(text or ""):
        prefix = match.group("prefix").lower()
        tag_class = "oracle" if prefix in {"otag", "oracletag", "function"} else "art"
        tags.append({"prefix": prefix, "tag": match.group("tag").lower(), "tag_class": tag_class})
    return tags


def record_tag_candidates(record: dict[str, Any]) -> list[dict[str, str]]:
    text = " ".join(str(v) for v in record["values"].values() if v is not None)
    tags = extract_tags(text)
    sheet_category = normalize_term(f"{record['sheet']} {record_field(record, 'category')} {record['values'].get('Domain', '')}")
    term = normalize_term(record_field(record, "term"))
    if "tagger" in sheet_category and term and re.fullmatch(r"[a-z0-9][a-z0-9_-]*", term):
        prefix = "atag" if "art" in sheet_category and "oracle" not in sheet_category else "otag"
        tags.append({"prefix": prefix, "tag": term, "tag_class": "art" if prefix == "atag" else "oracle"})
    deduped = []
    seen = set()
    for tag in tags:
        key = (tag["prefix"], tag["tag"])
        if key not in seen:
            seen.add(key)
            deduped.append(tag)
    return deduped


def operator_probe_for(fragment: str) -> str | None:
    text = (fragment or "").strip()
    low = normalize_term(text)
    if not low or " " in low and all(token in {"and", "or", "not"} for token in low.split()):
        return None
    samples = [
        (r"^(t|type):?$", "t:creature"),
        (r"^(o|oracle):?$", "o:draw"),
        (r"^(kw|keyword):?$", "kw:flying"),
        (r"^(c|color):?$", "c:w"),
        (r"^(id|identity|ci):?$", "id<=w"),
        (r"^(mv|cmc):?$", "mv<=3"),
        (r"^(pow|power):?$", "pow>=3"),
        (r"^(tou|toughness):?$", "tou>=3"),
        (r"^(loy|loyalty):?$", "loy>=3"),
        (r"^(legal|format):?$", "legal:commander"),
        (r"^(f|format):?$", "f:commander"),
        (r"^(set|s|e|edition):?$", "set:lea"),
        (r"^(r|rarity):?$", "r:rare"),
        (r"^(a|artist):?$", "a:avon"),
        (r"^(flavor|ft):?$", "flavor:dragon"),
        (r"^(usd|eur|tix|price):?$", "usd<1"),
        (r"^is:?$", "is:commander"),
        (r"^border:?$", "border:black"),
        (r"^frame:?$", "frame:2015"),
        (r"^game:?$", "game:paper"),
        (r"^year:?$", "year>=2020"),
        (r"^date:?$", "date>=2020-01-01"),
    ]
    for pattern, query in samples:
        if re.search(pattern, low):
            return query
    if re.search(r"\b[a-z][a-z0-9_]*(=|:|<=|>=|<|>|!=)", low) and not any(ch in low for ch in "{}[]"):
        return text
    return None


def probe_scryfall_query(query: str, retry_on_rate_limit: bool = True) -> dict[str, Any]:
    encoded = urllib.parse.urlencode({"q": query, "unique": "cards", "order": "name"})
    url = f"https://api.scryfall.com/cards/search?{encoded}"
    try:
        payload = http_json(url)
        first = (payload.get("data") or [{}])[0]
        return {
            "query": query,
            "url": url,
            "status": 200,
            "accepted": True,
            "total_cards": payload.get("total_cards"),
            "first_result": {"name": first.get("name"), "type_line": first.get("type_line")},
        }
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        if exc.code == 429 and retry_on_rate_limit:
            retry_after = exc.headers.get("Retry-After")
            try:
                delay = min(max(float(retry_after or 2), 2), 8)
            except ValueError:
                delay = 4
            time.sleep(delay)
            return probe_scryfall_query(query, retry_on_rate_limit=False)
        return {"query": query, "url": url, "status": exc.code, "accepted": False, "error": body[:500]}
    except Exception as exc:
        return {"query": query, "url": url, "accepted": False, "network_error": f"{type(exc).__name__}: {exc}"}


def build_collisions(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for record in records:
        key = normalized_record_key(record)
        if key:
            grouped[key].append(record)
    collisions = []
    for key, group in sorted(grouped.items()):
        categories = sorted({normalize_term(record_field(r, "category") or r["sheet"]) for r in group if normalize_term(record_field(r, "category") or r["sheet"])})
        mappings = sorted({normalize_term(record_field(r, "mapping")) for r in group if normalize_term(record_field(r, "mapping"))})
        if len(group) > 1 and (len(categories) > 1 or len(mappings) > 1):
            collisions.append(
                {
                    "normalized_phrase": key,
                    "record_count": len(group),
                    "candidate_meanings": [
                        {
                            "record_id": workbook_record_id(r),
                            "sheet": r["sheet"],
                            "row_number": r["row_number"],
                            "term": record_field(r, "term"),
                            "category": record_field(r, "category"),
                            "mapping": record_field(r, "mapping"),
                            "status": record_field(r, "status"),
                        }
                        for r in group
                    ],
                    "source_categories": categories,
                    "possible_scryfall_fragments": mappings,
                    "requires_sentence_context": True,
                    "native_and_semantic_mix": any(category_catalog_key(c) for c in categories) and any(any(h in c for h in SEMANTIC_HINTS) for c in categories),
                    "should_be_plain_reading_disambiguation_test": key in {"treasure", "equipment", "landfall", "proliferate", "chaos", "counter", "draw", "mill", "blink", "sacrifice", "etb", "aristocrats", "control", "ramp"},
                }
            )
    return collisions


def classify_records(records: list[dict[str, Any]], catalogs_snapshot: dict[str, Any], probes: dict[str, Any], collisions: list[dict[str, Any]]) -> list[dict[str, Any]]:
    catalog_values = catalogs_snapshot.get("catalogs", {})
    collision_keys = {c["normalized_phrase"] for c in collisions}
    row_results = []
    for record in records:
        term = record_field(record, "term")
        normalized = normalized_record_key(record)
        category = record_field(record, "category") or ""
        status = record_field(record, "status") or ""
        confidence = record_field(record, "confidence")
        mapping = record_field(record, "mapping") or ""
        values_text = " ".join(str(v) for v in record["values"].values() if v is not None)
        disposition = "UNVERIFIED"
        reason = "No external or internal verifier matched this record."
        evidence: dict[str, Any] = {}
        review_action = "Owner/domain review required before promotion."

        if classify_source_artifact(str(term or ""), str(category or "")):
            disposition = "SOURCE_ARTIFACT"
            reason = "Record term appears to be a heading/category label ingested as data."
            review_action = "Remove from semantic promotion candidates or correct the source row in a derived review process."
        else:
            native_disposition, native_reason, matched_value = classify_native(str(term or ""), str(category or ""), record["sheet"], catalog_values)
            if native_disposition:
                disposition = native_disposition
                reason = native_reason
                evidence = {"matched_value": matched_value, "catalog_source": catalogs_snapshot.get("source"), "retrieved_at": catalogs_snapshot.get("retrieved_at")}
                review_action = "Safe only as current native catalog fact." if disposition == "VERIFIED_NATIVE" else "Review stale/native mismatch before use."

        if disposition in {"UNVERIFIED", "STALE"}:
            tags = record_tag_candidates(record)
            for tag in tags:
                probe = probes.get("tagger", {}).get(f"{tag['prefix']}:{tag['tag']}")
                if probe:
                    tag_disposition = classify_tagger_probe_result(probe)
                    if tag_disposition == "VERIFIED_TAG":
                        disposition = tag_disposition
                        reason = f"Exact Tagger {tag['tag_class']} tag probe returned current results."
                        evidence = probe
                        review_action = "Safe only as exact governed Tagger mapping; preserve workbook limitations."
                        break
                    elif tag_disposition == "STALE":
                        disposition = "STALE"
                        reason = "Tagger probe indicates the claimed tag is not currently accepted."
                        evidence = probe
                        review_action = "Queue for tag review; do not replace with fuzzy tag."

        if disposition in {"UNVERIFIED", "STALE"}:
            probe_query = operator_probe_for(str(mapping or term or ""))
            probe = probes.get("operators", {}).get(probe_query or "")
            if probe:
                query_disposition = classify_operator_probe_result(probe)
                if query_disposition == "VERIFIED_QUERY":
                    disposition = query_disposition
                    reason = "Bounded Scryfall query/operator probe was accepted and returned structured result metadata."
                    evidence = probe
                    review_action = "Safe only as probed syntax behavior; semantics still limited to probe coverage."
                elif query_disposition == "INVALID":
                    disposition = "INVALID"
                    reason = "Bounded Scryfall query/operator probe was rejected."
                    evidence = probe
                    review_action = "Correct or retire syntax claim in source-review process."

        issue = confidence_issue(confidence)
        status_norm = normalize_term(status)
        if issue and status_norm in {"production-ready", "production ready", "production"}:
            disposition = "INVALID"
            reason = f"Production-ready record has invalid confidence metadata: {issue}."
            review_action = "Fix source metadata before promotion."
        elif status_norm in {"production-ready", "production ready", "production"} and not normalize_term(mapping) and disposition not in {"VERIFIED_NATIVE", "VERIFIED_INTERNAL", "VERIFIED_TAG"}:
            disposition = "INVALID"
            reason = "Production-ready record is missing an executable or verifiable mapping."
            review_action = "Queue for owner/domain review; no promotion."

        if normalized in collision_keys and disposition not in {"INVALID", "SOURCE_ARTIFACT", "STALE"}:
            disposition = "AMBIGUOUS"
            reason = "Same normalized term has multiple legitimate workbook meanings or mappings."
            review_action = "Add context-sensitive Plain Reading disambiguation; do not select a global winner."
        elif disposition == "UNVERIFIED" and any(h in normalize_term(f"{category} {record['sheet']}") for h in SEMANTIC_HINTS):
            disposition = "SEMANTIC_REVIEW"
            reason = "Legitimate player/semantic terminology, but interpretation depends on context or non-native assumptions."
            review_action = "Owner/domain review before executable mapping."
        elif disposition == "UNVERIFIED" and not category_catalog_key(str(category), record["sheet"]) and not record_tag_candidates(record) and not operator_probe_for(str(mapping or term or "")):
            disposition = "VERIFIED_INTERNAL"
            reason = "Workbook governance/schema/internal record; no external Scryfall fact required by this verifier."
            review_action = "Keep as internal workbook governance unless a later source authority says otherwise."

        assert disposition in CONTROLLED_DISPOSITIONS
        row_results.append(
            {
                "record_id": workbook_record_id(record),
                "sheet": record["sheet"],
                "row_number": record["row_number"],
                "term": term,
                "normalized_term": normalized,
                "workbook_category": category,
                "workbook_status": status,
                "workbook_confidence": confidence,
                "workbook_mapping": mapping,
                "verification_disposition": disposition,
                "reason": reason,
                "evidence": evidence,
                "recommended_review_action": review_action,
            }
        )
    return row_results


def build_inventory(records: list[dict[str, Any]], sheet_inventory: list[dict[str, Any]]) -> dict[str, Any]:
    ids = [workbook_record_id(r) for r in records]
    normalized = [normalized_record_key(r) for r in records if normalized_record_key(r)]
    status_counts = Counter(normalize_term(record_field(r, "status")) or "(blank)" for r in records)
    confidence_issues = [
        {"record_id": workbook_record_id(r), "sheet": r["sheet"], "row_number": r["row_number"], "issue": confidence_issue(record_field(r, "confidence"))}
        for r in records
        if confidence_issue(record_field(r, "confidence"))
    ]
    invalid_statuses = [
        {"record_id": workbook_record_id(r), "status": record_field(r, "status")}
        for r in records
        if normalize_term(record_field(r, "status")) and normalize_term(record_field(r, "status")) not in VALID_STATUSES
    ]
    return {
        "sheet_count": len(sheet_inventory),
        "record_count": len(records),
        "sheets": sheet_inventory,
        "status_counts": dict(sorted(status_counts.items())),
        "duplicate_ids": {key: count for key, count in sorted(Counter(ids).items()) if count > 1},
        "duplicate_normalized_keys": {key: count for key, count in sorted(Counter(normalized).items()) if count > 1},
        "confidence_issues": confidence_issues,
        "invalid_statuses": invalid_statuses,
        "formula_error_records": [
            {"record_id": workbook_record_id(r), "sheet": r["sheet"], "row_number": r["row_number"], "errors": r["errors"]}
            for r in records
            if r["errors"]
        ],
    }


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True, default=str), encoding="utf-8")


def write_jsonl(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        for row in rows:
            handle.write(json.dumps(row, sort_keys=True, default=str) + "\n")


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fields = [
        "record_id",
        "sheet",
        "row_number",
        "term",
        "normalized_term",
        "workbook_category",
        "workbook_status",
        "workbook_confidence",
        "workbook_mapping",
        "verification_disposition",
        "reason",
        "recommended_review_action",
    ]
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def collect_probes(records: list[dict[str, Any]], allow_network: bool, cache_dir: Path, max_operator_probes: int) -> dict[str, Any]:
    cache_path = cache_dir / "scryfall-probes.json"
    if not allow_network and cache_path.exists():
        return json.loads(cache_path.read_text(encoding="utf-8"))
    operator_queries: list[str] = []
    tag_queries: list[str] = []
    for record in records:
        fields = " ".join(str(v) for v in record["values"].values() if v is not None)
        mapping = str(record_field(record, "mapping") or "")
        for tag in record_tag_candidates(record):
            query = f"{tag['prefix']}:{tag['tag']}"
            if query not in tag_queries:
                tag_queries.append(query)
        category = normalize_term(record_field(record, "category") or record["sheet"])
        if any(marker in category for marker in ("operator", "query", "recipe", "regex", "syntax", "scryfall")):
            probe = operator_probe_for(mapping or str(record_field(record, "term") or ""))
            if probe and probe not in operator_queries:
                operator_queries.append(probe)
    operator_queries = operator_queries[:max_operator_probes]
    probes = {"retrieved_at": now_iso() if allow_network else None, "operators": {}, "tagger": {}, "network": "enabled" if allow_network else "disabled"}
    if allow_network:
        for query in tag_queries:
            probes["tagger"][query] = probe_scryfall_query(query)
            time.sleep(0.6)
        for query in operator_queries:
            probes["operators"][query] = probe_scryfall_query(query)
            time.sleep(0.35)
    else:
        probes["operator_candidates"] = operator_queries
        probes["tagger_candidates"] = tag_queries
    write_json(cache_path, probes)
    return probes


def extract_qa_cases(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    cases = []
    for record in records:
        headers = list(record["values"].keys())
        sheet = normalize_term(record["sheet"])
        category = normalize_term(record_field(record, "category"))
        qa_context = any(marker in f"{sheet} {category}" for marker in ("qa", "eval", "evaluation", "test", "checklist"))
        if not qa_context:
            continue
        input_col = find_col(headers, r"^input$", r"\butterance\b", r"\bplain\b.*\binput\b", r"\bplain\b.*\breading\b", r"\bquery text\b", r"\bsearch\b")
        expected_col = find_col(headers, r"\bexpected\b", r"\btarget\b")
        if not input_col:
            continue
        text = record["values"].get(input_col) if input_col else record_field(record, "term")
        if not normalize_term(text):
            continue
        cases.append(
            {
                "case_id": workbook_record_id(record),
                "sheet": record["sheet"],
                "row_number": record["row_number"],
                "input": str(text),
                "expected": record["values"].get(expected_col) if expected_col else record_field(record, "expected"),
                "workbook_status": record_field(record, "status"),
                "workbook_category": record_field(record, "category"),
            }
        )
    return cases


def workbook_stage(args: argparse.Namespace) -> None:
    workbook_path = Path(args.workbook).resolve()
    before_hash = sha256_file(workbook_path)
    workbook = read_xlsx(workbook_path)
    records, sheet_inventory = extract_records(workbook)
    inventory = build_inventory(records, sheet_inventory)
    collisions = build_collisions(records)
    cache_dir = Path(args.output).resolve() / "cache"
    catalogs = fetch_scryfall_catalogs(cache_dir, args.allow_network)
    probes = collect_probes(records, args.allow_network, cache_dir, args.max_operator_probes)
    rows = classify_records(records, catalogs, probes, collisions)
    after_hash = sha256_file(workbook_path)
    if before_hash != after_hash:
        raise RuntimeError("Source workbook hash changed during verification; refusing to continue.")

    output = Path(args.output).resolve()
    output.mkdir(parents=True, exist_ok=True)
    metadata = {
        "source_workbook": str(workbook_path),
        "source_sha256": before_hash,
        "verification_timestamp": now_iso(),
        "branch": os.popen("git branch --show-current").read().strip(),
        "source_immutable_check": "PASS",
        "workbook_size_bytes": workbook_path.stat().st_size,
    }
    write_json(output / "metadata.json", metadata)
    write_json(output / "workbook-inventory.json", inventory)
    write_json(output / "collisions.json", collisions)
    write_json(output / "native-catalog-results.json", catalogs)
    write_json(output / "operator-and-tagger-probes.json", probes)
    write_jsonl(output / "row-verification.jsonl", rows)
    write_csv(output / "row-verification.csv", rows)
    review_queue = [row for row in rows if row["verification_disposition"] in {"INVALID", "SOURCE_ARTIFACT", "STALE", "UNVERIFIED", "AMBIGUOUS", "SEMANTIC_REVIEW"}]
    write_json(output / "owner-review-queue.json", review_queue)
    write_json(output / "plain-reading-qa-cases.json", extract_qa_cases(records))


def summarize_stage(args: argparse.Namespace) -> None:
    output = Path(args.output).resolve()
    metadata = json.loads((output / "metadata.json").read_text(encoding="utf-8"))
    inventory = json.loads((output / "workbook-inventory.json").read_text(encoding="utf-8"))
    rows = [json.loads(line) for line in (output / "row-verification.jsonl").read_text(encoding="utf-8").splitlines() if line.strip()]
    collisions = json.loads((output / "collisions.json").read_text(encoding="utf-8"))
    review_queue = json.loads((output / "owner-review-queue.json").read_text(encoding="utf-8"))
    probes = json.loads((output / "operator-and-tagger-probes.json").read_text(encoding="utf-8"))
    qa_path = output / "plain-reading-qa-baseline.json"
    qa_baseline = json.loads(qa_path.read_text(encoding="utf-8")) if qa_path.exists() else {"cases": [], "summary": {"status": "not-run"}}
    dispositions = Counter(row["verification_disposition"] for row in rows)
    operator_summary = Counter(classify_operator_probe_result(v) for v in probes.get("operators", {}).values())
    tag_summary = Counter(classify_tagger_probe_result(v) for v in probes.get("tagger", {}).values())

    lines = [
        "# VM-577 Scryfall Maze Master Verification Summary",
        "",
        f"- Source workbook: `{metadata['source_workbook']}`",
        f"- Workbook SHA-256: `{metadata['source_sha256']}`",
        f"- Verification timestamp: `{metadata['verification_timestamp']}`",
        f"- Source immutable check: `{metadata['source_immutable_check']}`",
        f"- Sheets inventoried: `{inventory['sheet_count']}`",
        f"- Workbook records extracted: `{inventory['record_count']}`",
        f"- Collision records: `{len(collisions)}`",
        f"- Owner review queue rows: `{len(review_queue)}`",
        "",
        "## Counts By Workbook Status",
        "",
    ]
    for key, count in inventory["status_counts"].items():
        lines.append(f"- `{key}`: {count}")
    lines.extend(["", "## Counts By Verification Disposition", ""])
    for key, count in sorted(dispositions.items()):
        lines.append(f"- `{key}`: {count}")
    lines.extend(["", "## Operator Verification Summary", ""])
    if operator_summary:
        for key, count in sorted(operator_summary.items()):
            lines.append(f"- `{key}`: {count}")
    else:
        lines.append("- No live operator probes were run; see candidate list/cache.")
    lines.extend(["", "## Tagger Verification Summary", ""])
    if tag_summary:
        for key, count in sorted(tag_summary.items()):
            lines.append(f"- `{key}`: {count}")
    else:
        lines.append("- No live Tagger probes were run; see candidate list/cache.")
    lines.extend(
        [
            "",
            "## Plain Reading QA Baseline",
            "",
            f"- Cases found: `{qa_baseline.get('summary', {}).get('total_cases', len(qa_baseline.get('cases', [])))}`",
            f"- Clean exact-query passes: `{qa_baseline.get('summary', {}).get('exact_query_matches', 0)}`",
            f"- Semantic/questionable or unscored cases: `{qa_baseline.get('summary', {}).get('unscored_or_semantic', 0)}`",
            f"- Compiler errors: `{qa_baseline.get('summary', {}).get('compiler_errors', 0)}`",
            "",
            "## Major Findings",
            "",
            "- The workbook should be treated as safe only by verified subset, not as a fully authoritative baseline.",
            "- Native Scryfall facts, query/operator behavior, Tagger tags, internal governance rows, and player-language semantics require distinct dispositions.",
            "- `AMBIGUOUS`, `SEMANTIC_REVIEW`, and `UNVERIFIED` rows are evidence outcomes, not failures, unless a Production-ready claim depends on them.",
            "- Review `owner-review-queue.json` first for invalid, stale, source-artifact, ambiguous, semantic-review, and unverified rows.",
            "",
            "## Known Limitations",
            "",
            "- Live Scryfall and Tagger checks are bounded probes, not exhaustive card-result equivalence tests.",
            "- If network was disabled or unavailable, native catalog evidence falls back to the checked-in grounding artifact and must not be called current live Scryfall truth.",
            "- Tagger exact existence is inferred through bounded Scryfall search behavior because no separate committed Tagger tag catalog is available in this repository.",
            "",
            "## Source Artifacts",
            "",
            "- `workbook-inventory.json`",
            "- `row-verification.jsonl` and `row-verification.csv`",
            "- `native-catalog-results.json`",
            "- `operator-and-tagger-probes.json`",
            "- `collisions.json`",
            "- `owner-review-queue.json`",
            "- `plain-reading-qa-cases.json`",
            "- `plain-reading-qa-baseline.json`",
        ]
    )
    (output / "executive-summary.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", default=str(DEFAULT_WORKBOOK))
    parser.add_argument("--output", default=str(OUTPUT_DIR))
    parser.add_argument("--stage", choices=["workbook", "summarize"], default="workbook")
    parser.add_argument("--allow-network", action="store_true")
    parser.add_argument("--max-operator-probes", type=int, default=80)
    args = parser.parse_args(argv)
    if args.stage == "workbook":
        workbook_stage(args)
    else:
        summarize_stage(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
