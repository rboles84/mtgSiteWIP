#!/usr/bin/env python3
# boros_flavor_generator/generator.py
# Python 3.10+ script to generate flavor lines from templates.json

import json
import argparse
from pathlib import Path

TEMPLATES_PATH = Path(__file__).parent / "templates.json"

def load_templates(path=TEMPLATES_PATH):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def generate(archetype: str, intensity: int, templates=None):
    if templates is None:
        templates = load_templates()
    for t in templates:
        if t["archetype"].lower() == archetype.lower():
            level = str(max(1, min(5, intensity)))
            return t["intensity_levels"].get(level, "")
    raise ValueError(f"Archetype '{archetype}' not found.")

def cli():
    parser = argparse.ArgumentParser(description="Generate Boros flavor lines.")
    parser.add_argument("archetype", help="Archetype name (e.g., Paladin, Vanguard)")
    parser.add_argument("intensity", type=int, help="Intensity level 1-5")
    parser.add_argument("--templates", help="Path to templates.json", default=str(TEMPLATES_PATH))
    args = parser.parse_args()
    templates = load_templates(Path(args.templates))
    try:
        line = generate(args.archetype, args.intensity, templates)
        print(line)
    except ValueError as e:
        print(e)

if __name__ == "__main__":
    cli()
