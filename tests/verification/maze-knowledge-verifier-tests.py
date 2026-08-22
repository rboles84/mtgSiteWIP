import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPT_PATH = REPO_ROOT / "scripts" / "verify-maze-knowledge.py"
spec = importlib.util.spec_from_file_location("verify_maze_knowledge", SCRIPT_PATH)
verifier = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = verifier
spec.loader.exec_module(verifier)


class MazeKnowledgeVerifierTests(unittest.TestCase):
    def test_worm_and_wurm_are_distinct_native_matches(self):
        catalogs = {"creature-types": ["Worm", "Wurm"]}
        worm = verifier.classify_native("Worm", "Creature Type", "Native", catalogs)
        wurm = verifier.classify_native("Wurm", "Creature Type", "Native", catalogs)
        self.assertEqual(worm[0], "VERIFIED_NATIVE")
        self.assertEqual(wurm[0], "VERIFIED_NATIVE")
        self.assertNotEqual(verifier.normalize_term(worm[2]), verifier.normalize_term(wurm[2]))

    def test_native_non_match_is_stale(self):
        disposition, reason, matched = verifier.classify_native("Ability word", "Ability Words", "Native", {"ability-words": ["Landfall"]})
        self.assertEqual(disposition, "STALE")
        self.assertIsNone(matched)
        self.assertIn("No exact match", reason)

    def test_collision_detection_reports_multiple_mappings(self):
        records = [
            {"sheet": "Lexicon", "row_number": 2, "values": {"Term": "Counter", "Category": "Oracle", "Scryfall Output": "o:counter"}, "formulas": {}, "errors": {}},
            {"sheet": "Lexicon", "row_number": 3, "values": {"Term": "counter", "Category": "Counterspell", "Scryfall Output": "otag:counterspell"}, "formulas": {}, "errors": {}},
        ]
        collisions = verifier.build_collisions(records)
        self.assertEqual(len(collisions), 1)
        self.assertEqual(collisions[0]["normalized_phrase"], "counter")
        self.assertTrue(collisions[0]["requires_sentence_context"])

    def test_source_artifact_detection(self):
        self.assertTrue(verifier.classify_source_artifact("Ability word", "Ability Words"))
        self.assertFalse(verifier.classify_source_artifact("Landfall", "Ability Words"))

    def test_network_failure_is_unverified_not_invalid(self):
        result = {"query": "t:creature", "network_error": "Timeout"}
        self.assertEqual(verifier.classify_operator_probe_result(result), "UNVERIFIED")

    def test_operator_probe_rejection_is_invalid(self):
        result = {"query": "badoperator:value", "status": 400, "accepted": False}
        self.assertEqual(verifier.classify_operator_probe_result(result), "INVALID")

    def test_tagger_exact_probe_classification(self):
        valid = {"query": "otag:ramp", "status": 200, "accepted": True, "total_cards": 10}
        stale = {"query": "otag:not-a-real-tag", "status": 400, "accepted": False}
        self.assertEqual(verifier.classify_tagger_probe_result(valid), "VERIFIED_TAG")
        self.assertEqual(verifier.classify_tagger_probe_result(stale), "STALE")

    def test_confidence_and_status_reporting(self):
        self.assertEqual(verifier.confidence_issue("120%"), "confidence outside 0..1")
        self.assertIsNone(verifier.confidence_issue("High"))

    def test_immutable_hash_helper_is_stable(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "source.xlsx"
            path.write_bytes(b"immutable")
            first = verifier.sha256_file(path)
            second = verifier.sha256_file(path)
            self.assertEqual(first, second)

    def test_json_output_is_deterministic(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "out.json"
            verifier.write_json(path, {"b": 1, "a": 2})
            self.assertEqual(json.loads(path.read_text()), {"a": 2, "b": 1})


if __name__ == "__main__":
    unittest.main()
