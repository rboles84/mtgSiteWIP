import {
  buildPresentationSnapshotPayload,
  writePresentationSnapshotFiles,
} from "./presentation-snapshot-runner.mjs";

const payload = await buildPresentationSnapshotPayload();
await writePresentationSnapshotFiles(payload);

console.log(`Generated ${payload.case_count} presentation snapshot cases.`);
console.log("Wrote artifacts/presentation-snapshots/presentation-snapshots.json");
console.log("Wrote artifacts/presentation-snapshots/presentation-snapshots.csv");
console.log("Wrote artifacts/presentation-snapshots/presentation-snapshots.md");
