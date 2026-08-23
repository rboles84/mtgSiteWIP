from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
PREVIEW_ROOT = ROOT / "outputs" / "01a02cd6-bce7-7832-9558-3075c52f146a" / "archscry-current-state-2026-08-22" / "evidence" / "workbook-previews"
THUMB_SIZE = (520, 300)
CAPTION_HEIGHT = 38
COLS = 3
PER_SHEET = 12


def build_contacts(label: str) -> list[Path]:
    source = PREVIEW_ROOT / label
    images = sorted(source.glob("*.png"))
    if len(images) != 42:
        raise RuntimeError(f"Expected 42 {label} previews; found {len(images)}")
    outputs = []
    for page, start in enumerate(range(0, len(images), PER_SHEET), start=1):
        batch = images[start:start + PER_SHEET]
        rows = (len(batch) + COLS - 1) // COLS
        canvas = Image.new("RGB", (COLS * THUMB_SIZE[0], rows * (THUMB_SIZE[1] + CAPTION_HEIGHT)), "#E9EEF2")
        draw = ImageDraw.Draw(canvas)
        for index, image_path in enumerate(batch):
            with Image.open(image_path) as source_image:
                preview = source_image.convert("RGB")
                preview.thumbnail(THUMB_SIZE, Image.Resampling.LANCZOS)
                x = (index % COLS) * THUMB_SIZE[0] + (THUMB_SIZE[0] - preview.width) // 2
                y_base = (index // COLS) * (THUMB_SIZE[1] + CAPTION_HEIGHT)
                y = y_base + (THUMB_SIZE[1] - preview.height) // 2
                canvas.paste(preview, (x, y))
                caption = image_path.stem[:68]
                draw.rectangle((index % COLS * THUMB_SIZE[0], y_base + THUMB_SIZE[1], (index % COLS + 1) * THUMB_SIZE[0], y_base + THUMB_SIZE[1] + CAPTION_HEIGHT), fill="#243447")
                draw.text((index % COLS * THUMB_SIZE[0] + 10, y_base + THUMB_SIZE[1] + 10), caption, fill="white", font=ImageFont.load_default())
        output = PREVIEW_ROOT / f"{label}-contact-{page:02d}.png"
        canvas.save(output, optimize=True)
        outputs.append(output)
    return outputs


if __name__ == "__main__":
    all_outputs = build_contacts("dossier") + build_contacts("engine")
    for output in all_outputs:
        print(output.relative_to(ROOT).as_posix())
