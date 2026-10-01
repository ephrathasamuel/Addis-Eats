# Addis Eats — React Frontend

A food-ordering frontend for the Module 3 (Day 35) React Project Brief.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The menu data is served from `public/menu-data.json`
via `src/api/dishes.js`, standing in for a real backend API.

## Routes

| Route | Screen |
|---|---|
| `/` | Home — today's specials |
| `/menu` | Menu — search, category filter (`?category=`) |
| `/menu/:id` | Dish detail |
| `/cart` | Cart |
| `/checkout` | Checkout (guarded — sign in first) |
| `/favorites` | Saved dishes |
| `/orders` | Order history + reorder |

## Docs

- `TECHNICAL_PLAN.md` — state management approach, component tree, folder
  structure, and implementation approach (Step 5 of the brief).
- `DESIGN_SPEC.md` — color/type/layout tokens to hand to Figma or Google Stitch
  for the UI mockup (Step 3 of the brief).

## Notes on scope

All 15 core customer features from the brief are implemented, plus the
"additional" boosters: favorites, order history + reorder, dish detail,
delivery fee/ETA, theme toggle, special instructions, cart badge, and
ETB currency formatting. The admin route group described in the brief is not
built here — it's a good next extension, and `TECHNICAL_PLAN.md` explains
how it would slot in under `/admin` without touching this code.
