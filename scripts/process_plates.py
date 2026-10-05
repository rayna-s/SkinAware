from __future__ import annotations

import argparse
import re
from pathlib import Path

import pytesseract
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
    "imperigo": "impetigo",
    "athlete": "athletes-foot",
    "tinea pedis": "athletes-foot",
    "ringworm": "ringworm",
    "tinea corporis": "ringworm",
    "bingwarm": "ringworm",
    "cellulitis": "cellulitis",
    "cellultis": "cellulitis",
    "poison ivy": "poison-ivy",
    "heat rash": "heat-rash",
    "miliaria": "heat-rash",
    "millaria": "heat-rash",
    "insect bite": "insect-bite",
    "insent bite": "insect-bite",
    "hand foot": "hfmd",
    "hand, foot": "hfmd",
    "molluscum": "molluscum",
    "malluscum": "molluscum",
    "viral warts": "warts",
    "scabies": "scabies",
    "measles": "measles",
    "mneasles": "measles",
    "vitiligo": "vitiligo",
    "fifth disease": "fifth-disease",
    "fiflh disease": "fifth-disease",
    "slapped cheek": "fifth-disease",
    "meningococcal": "meningococcal",
    "meningocecal": "meningococcal",
    "meningocccal": "meningococcal",
    "cold sores": "cold-sores",
    "herpes": "cold-sores",
    "frostbite": "frostbite",
    "hives": "hives",
    "urticaria": "hives",
    "acne": "acne",
}


def normalize_ocr(text: str) -> str:
    text = text.lower()
    replacements = {
        "tane": "tone",
        "lone": "tone",
        "fone": "tone",
        "mecium": "medium",
        "medlum": "medium",
        "lisht": "light",
        "ckin": "skin",
        "ebin": "skin",
        "clin": "skin",
        "chin tana": "skin tone",
        "skinned": "skin",
        "frypoxia": "hypoxia",
        "lumavie": "hypoxia",
        "vitilign": "vitiligo",
        "seahiec": "scabies",
        "scahies": "scabies",
        "scahiec": "scabies",
        "cellultic": "cellulitis",
        "cellultis": "cellulitis",
        "incent hite": "insect bite",
        "insent bite": "insect bite",
        "poison lvy": "poison ivy",
        "teat rack": "heat rash",
        "aaillarial": "miliaria",
        "hivec": "hives",
        "furticarial": "urticaria",
        "rives": "hives",
        "meningorcccal": "meningococcal",
        "meningocccal": "meningococcal",
        "meningocecal": "meningococcal",
    }
    for src, dest in replacements.items():
        text = text.replace(src, dest)
    text = text.replace("an ", "on ")
    text = re.sub(r"[^a-z0-9\s]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def detect_tone(text: str) -> str | None:
    lowered = normalize_ocr(text)
    match = re.search(r"\bon\s+(light|medium|dark|fair)\b", lowered)
    if match:
        tone = match.group(1)
        return "light" if tone == "fair" else tone
    # Captions like "Viral warts medium skin tone" with no "on"
    match = re.search(r"\b(light|medium|dark|fair)\s+skin", lowered)
    if match:
        tone = match.group(1)
        return "light" if tone == "fair" else tone
    return None


def detect_condition(text: str) -> str | None:
    lowered = normalize_ocr(text)
    for needle, slug in sorted(CONDITION_MAP.items(), key=lambda item: -len(item[0])):
        if needle in lowered:
            return slug
    return None


def row_stats(gray: Image.Image, y: int) -> tuple[float, float]:
    width = gray.size[0]
    pixels = gray.load()
    samples = [pixels[x, y] for x in range(0, width, max(1, width // 80))]
    mean = sum(samples) / len(samples)
    spread = max(samples) - min(samples)
    return mean, spread


def is_pale_row(gray: Image.Image, y: int) -> bool:
    mean, _spread = row_stats(gray, y)
    return mean > 208


def trim_whitespace(image: Image.Image, threshold: int = 18) -> Image.Image:
    bg = Image.new("RGB", image.size, (255, 255, 255))
    diff = ImageOps.grayscale(ImageChops.difference(image, bg)).filter(
        ImageFilter.BoxBlur(1)
    )
    mask = diff.point(lambda p: 255 if p > threshold else 0)
    bbox = mask.getbbox()
    if not bbox:
        return image
    pad = 4
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(image.width, right + pad)
    bottom = min(image.height, bottom + pad)
    return image.crop((left, top, right, bottom))


def ocr_strip(image: Image.Image) -> str:
    gray = ImageOps.autocontrast(ImageOps.grayscale(image))
    scaled = gray.resize((gray.width * 2, gray.height * 2), Image.Resampling.LANCZOS)
    text = pytesseract.image_to_string(scaled, config="--psm 6")
    return normalize_ocr(text)


def find_caption_ranges(image: Image.Image) -> list[tuple[int, int, str]]:
    """Locate horizontal caption bands by OCR on light strips."""
    gray = ImageOps.grayscale(image)
    width, height = gray.size
    window = max(28, min(48, height // 16))
    found: list[tuple[int, int, str]] = []
    y = 0
    while y < height - 12:
        mean, _ = row_stats(gray, min(height - 1, y + window // 2))
        if mean < 198:
            y += 10
            continue
        strip = image.crop((0, y, width, min(height, y + window)))
        text = ocr_strip(strip)
        if detect_condition(text) or detect_tone(text):
            bottom = min(height, y + window)
            while bottom < height and is_pale_row(gray, bottom):
                bottom += 1
            found.append((y, bottom, text))
            y = bottom + 4
            continue
        y += 10
    merged: list[tuple[int, int, str]] = []
    for top, bottom, text in found:
        if merged and top <= merged[-1][1] + 8:
            prev_top, _, prev_text = merged[-1]
            merged[-1] = (prev_top, bottom, prev_text if len(prev_text) >= len(text) else text)
        else:
            merged.append((top, bottom, text))
    return merged


def split_into_blocks(image: Image.Image) -> list[tuple[str, Image.Image, str]]:
    """Return (kind, crop, ocr) where kind is caption or photo."""
    width, height = image.size
    captions = find_caption_ranges(image)
    if not captions:
        return []

    blocks: list[tuple[str, Image.Image, str]] = []
    for index, (top, bottom, text) in enumerate(captions):
        blocks.append(("caption", image.crop((0, top, width, bottom)), text))
        photo_top = bottom
        photo_bottom = captions[index + 1][0] if index + 1 < len(captions) else height
        if photo_bottom - photo_top < 40:
            continue
        photo = clean_photo(image.crop((0, photo_top, width, photo_bottom)))
        if photo:
            blocks.append(("photo", photo, ""))
    return blocks


def clean_photo(crop: Image.Image) -> Image.Image | None:
    photo = trim_whitespace(crop)
    if photo.width < 40 or photo.height < 40:
        return None
    leftover = ocr_strip(photo.crop((0, 0, photo.width, min(70, photo.height // 4))))
    if detect_condition(leftover) or detect_tone(leftover):
        photo = trim_whitespace(
            photo.crop((0, min(64, photo.height // 5), photo.width, photo.height))
        )
    chrome = ocr_strip(photo.crop((0, max(0, photo.height - 52), photo.width, photo.height)))
    if "page" in chrome or "paggee" in chrome:
        photo = trim_whitespace(photo.crop((0, 0, photo.width, max(40, photo.height - 56))))
    if photo.width < 60 or photo.height < 60:
        return None
    return photo


def pair_captions(blocks: list[tuple[str, Image.Image, str]]) -> list[tuple[str, Image.Image]]:
    pairs: list[tuple[str, Image.Image]] = []
    pending_caption = ""
    pending_photos: list[Image.Image] = []

    def flush() -> None:
        nonlocal pending_caption, pending_photos
        if not pending_photos:
            pending_caption = ""
            return
        if len(pending_photos) == 1:
            photo = pending_photos[0]
        else:
            photo = stack_photos(pending_photos)
        pairs.append((pending_caption, photo))
        pending_caption = ""
        pending_photos = []

    for kind, crop, text in blocks:
        if kind == "caption":
            if pending_photos:
                flush()
            pending_caption = text
        else:
            pending_photos.append(crop)
    flush()
    return pairs


def stack_photos(photos: list[Image.Image]) -> Image.Image:
    gap = 8
    width = max(photo.width for photo in photos)
    height = sum(photo.height for photo in photos) + gap * (len(photos) - 1)
    canvas = Image.new("RGB", (width, height), (255, 255, 255))
    y = 0
    for photo in photos:
        x = (width - photo.width) // 2
        canvas.paste(photo, (x, y))
        y += photo.height + gap
    return canvas


def label_from_text(text: str) -> tuple[str, str] | None:
    condition = detect_condition(text)
    tone = detect_tone(text)
    if condition and tone:
        return condition, tone
    return None


def process_file(path: Path) -> list[tuple[str, str, Image.Image, str]]:
    image = Image.open(path).convert("RGB")
    # Drop a thin dark viewer chrome strip if present at the bottom.
    gray = ImageOps.grayscale(image)
    bottom = image.height - 1
    while bottom > image.height * 0.85 and row_stats(gray, bottom)[0] < 50:
        bottom -= 1
    if bottom < image.height - 8:
        image = image.crop((0, 0, image.width, bottom + 1))

    blocks = split_into_blocks(image)
    pairs = pair_captions(blocks)
    results = []
    if not pairs:
        header = ocr_strip(image.crop((0, 0, image.width, max(36, int(image.height * 0.16)))))
        photo = trim_whitespace(
            image.crop((0, max(36, int(image.height * 0.12)), image.width, image.height))
        )
        results.append((header, photo, path.name))
        return [
            (*label, photo, path.name)
            for header, photo, _ in results
            if (label := label_from_text(header))
        ]

    labeled = []
    for caption, photo in pairs:
        label = label_from_text(caption)
        if not label:
            header = ocr_strip(photo.crop((0, 0, photo.width, min(80, photo.height // 5))))
            label = label_from_text(f"{caption} {header}")
        if label:
            labeled.append((*label, photo, f"{path.name}: {caption}"))
    if labeled:
        return labeled

    header = ocr_strip(image.crop((0, 0, image.width, max(36, int(image.height * 0.16)))))
    photo = trim_whitespace(
        image.crop((0, max(36, int(image.height * 0.12)), image.width, image.height))
    )
    label = label_from_text(header)
    return [(*label, photo, path.name)] if label else []


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

    chosen: dict[tuple[str, str], tuple[int, Image.Image, str]] = {}
    unmatched = 0
    for path in files:
        found = process_file(path)
        if not found:
            unmatched += 1
            print(f"unmatched {path.name}")
            continue
        for slug, tone, photo, source in found:
            area = photo.width * photo.height
            key = (slug, tone)
            if key not in chosen or area > chosen[key][0]:
                chosen[key] = (area, photo, source)
            print(f"found {slug}-{tone} from {path.name}")

    for (slug, tone), (_, photo, source) in sorted(chosen.items()):
        out = args.output_dir / f"{slug}-{tone}.jpg"
        photo.convert("RGB").save(out, quality=92, optimize=True)
        print(f"wrote {out.name}  ({photo.size[0]}x{photo.size[1]})  {source}")
    print(f"saved {len(chosen)} plates; unmatched files: {unmatched}")


if __name__ == "__main__":
    main()
