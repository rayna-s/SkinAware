# SkinAware

A visual reference for how common injuries and conditions present on **light**, **medium**, and **dark** skin. Built for school nurses, public health staff, and first-aid educators.

Search like a clinic note: `bruise on dark skin`, `eczema on medium skin`, `hypoxia on dark skin`.

## Run locally

```bash
npm install
npm test
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## How to search

Light, medium, and dark each cover two Fitzpatrick types:

| SkinAware | Fitzpatrick | Logo slice |
| --- | --- | --- |
| Light | I–II | Light peach |
| Medium | III–IV | Wheatish / tawny |
| Dark | V–VI | Deep brown |

There is also a **visual check** on the home screen if you are not sure of the name.

## Reference plates

Drop captioned source plates into `raw/` and run:

```bash
python3 scripts/process_plates.py raw public/images
```

The script splits stacked pages, crops caption bars, and writes `{condition}-{tone}.jpg` files. Until those files are in `public/images/`, the app shows a tone-matched plate so the rest of the interface still works.

SkinAware is a reference, not a diagnosis.
