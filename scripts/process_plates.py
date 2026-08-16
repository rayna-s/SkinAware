from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter, ImageOps


CONDITION_MAP = {
    "hypoxia": "hypoxia",
    "cyanosis": "hypoxia",
    "low oxygen": "hypoxia",
    "dark circles": "dark-circles",
    "dark circle": "dark-circles",
    "eczema": "eczema",
    "large bruise": "hematoma",
    "hematoma": "hematoma",
    "bruise": "bruise",
    "impetigo": "impetigo",
    "athlete": "athletes-foot",
    "tinea pedis": "athletes-foot",
    "ringworm": "ringworm",
    "tinea corporis": "ringworm",
    "cellulitis": "cellulitis",
    "cellultis": "cellulitis",
    "poison ivy": "poison-ivy",
    "heat rash": "heat-rash",
    "miliaria": "heat-rash",
    "insect bite": "insect-bite",
    "insent bite": "insect-bite",
    "hand foot": "hfmd",
    "hand, foot": "hfmd",
    "molluscum": "molluscum",
    "viral warts": "warts",
    "scabies": "scabies",
    "measles": "measles",
    "vitiligo": "vitiligo",
    "fifth disease": "fifth-disease",
    "slapped cheek": "fifth-disease",
    "meningococcal": "meningococcal",
    "meningocccal": "meningococcal",
    "cold sores": "cold-sores",
    "herpes": "cold-sores",
    "frostbite": "frostbite",
    "hives": "hives",
    "urticaria": "hives",
    "acne": "acne",
}


def detect_tone(text: str) -> str | None:
    lowered = text.lower()
    if "dark" in lowered:
        return "dark"
    if "medium" in lowered:
        return "medium"
    if "light" in lowered or "fair" in lowered:
        return "light"
    return None


def detect_condition(text: str) -> str | None:
    lowered = text.lower()
    for needle, slug in sorted(CONDITION_MAP.items(), key=lambda item: -len(item[0])):
        if needle in lowered:
            return slug
    return None


def is_pale_row(gray: Image.Image, y: int) -> bool:
    width = gray.size[0]
    pixels = gray.load()
    samples = [pixels[x, y] for x in range(0, width, max(1, width // 80))]
    mean = sum(samples) / len(samples)
    spread = max(samples) - min(samples)
    return mean > 210 and spread < 48


def caption_band(gray: Image.Image, from_top: bool = True) -> int:
    width, height = gray.size
    band = 0
    rows = range(0, int(height * 0.28)) if from_top else range(height - 1, int(height * 0.72), -1)
    for y in rows:
        if is_pale_row(gray, y):
            band += 1
        elif band > 8:
            break
        else:
            band = 0
    return min(int(height * 0.22), max(24, band))


def split_stacked(image: Image.Image) -> list[Image.Image]:
    gray = ImageOps.grayscale(image)
    width, height = gray.size
    gap_rows: list[int] = []
    run = 0
    run_start = 0
    for y in range(int(height * 0.15), int(height * 0.9)):
        if is_pale_row(gray, y):
            if run == 0:
                run_start = y
            run += 1
        else:
            if run > max(18, height * 0.03):
                gap_rows.append((run_start + y) // 2)
            run = 0
    cuts = [0, *[y for y in gap_rows], height]
    unique: list[int] = []
    for cut in cuts:
        if not unique or cut - unique[-1] > height * 0.18:
            unique.append(cut)
    if unique[-1] != height:
        unique.append(height)
    panels = []
    for start, end in zip(unique, unique[1:]):
        if end - start < height * 0.16:
            continue
        panels.append(image.crop((0, start, width, end)))
    return panels or [image]


def crop_caption(image: Image.Image) -> Image.Image:
    gray = ImageOps.grayscale(image)
    top = caption_band(gray, from_top=True)
    bottom = caption_band(gray, from_top=False)
    cropped = image.crop((0, top, image.width, image.height - bottom if bottom > 16 else image.height))
    # Trim residual white frame.
    bg = Image.new("RGB", cropped.size, (255, 255, 255))
    diff = ImageOps.grayscale(ImageChops.difference(cropped, bg)).filter(ImageFilter.BoxBlur(1))
    bbox = diff.point(lambda p: 255 if p > 16 else 0).getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
    return cropped


def ocr_caption(image: Image.Image) -> str:
    try:
        import pytesseract
    except ImportError:
        return ""
    header = image.crop((0, 0, image.width, max(40, int(image.height * 0.18))))
    try:
        return pytesseract.image_to_string(header) or ""
    except Exception:
        return ""


def slug_from_name(path: Path, caption: str) -> tuple[str, str] | None:
    text = f"{path.stem} {caption}".replace("_", " ").replace("-", " ")
    condition = detect_condition(text)
    tone = detect_tone(text)
    if condition and tone:
        return condition, tone
    return None


def process(source: Path, destination: Path, index: int) -> None:
    image = Image.open(source).convert("RGB")
    caption = ocr_caption(image)
    panels = split_stacked(image)
    for offset, panel in enumerate(panels):
        panel_caption = ocr_caption(panel) or caption
        cropped = crop_caption(panel)
        named = slug_from_name(source, panel_caption)
        if named:
            slug, tone = named
            name = f"{slug}-{tone}.jpg"
        else:
            name = f"plate-{index:02d}-{offset}.jpg"
        out = destination / name
        cropped.save(out, quality=92)
        print(f"wrote {out.name}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Crop SkinAware source plates.")
    parser.add_argument("input_dir", type=Path)
    parser.add_argument("output_dir", type=Path)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    files = sorted(
        path
        for path in args.input_dir.iterdir()
        if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )
    if not files:
        print(f"no plates in {args.input_dir}")
        return
    for index, path in enumerate(files, start=1):
        process(path, args.output_dir, index)


if __name__ == "__main__":
    main()
