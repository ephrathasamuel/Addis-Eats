# Addis Eats — UI Design Spec (for Figma / Google Stitch)

Use this as the brief you feed into your design tool for Step 3. It's opinionated on
purpose, so the app doesn't read as a generic food-delivery template.

## Concept
A neighbourhood Addis Ababa restaurant's ordering app — spice-market warmth, not a
Silicon Valley delivery clone. Think injera baskets, berbere-red awnings, hand-painted
menu boards, not glossy stock-photo "foodie app" aesthetics.

## Color tokens
| Role | Hex | Use |
|---|---|---|
| Paper | `#FBF3E7` | page background |
| Ink | `#2B1B14` | body text, headings |
| Berbere red | `#A8342A` | primary actions, price highlights |
| Turmeric gold | `#D9A441` | secondary accent, badges, hover states |
| Olive | `#5C6B3A` | success/confirmation states |
| Hairline | `#E4D6C1` | borders, dividers |

Dark theme (feature 22): Ink `#2B1B14` becomes background, Paper becomes text,
Berbere red and Turmeric gold stay as-is (they hold up on dark backgrounds).

## Type
- Display/headings: **Fraunces** (serif, warm, a little irregular — matches the
  hand-painted-menu-board feel). Weight 600, tight tracking, sentence case (never
  all-caps).
- Body/UI: **Work Sans** (clean geometric sans for prices, labels, buttons, forms).
- Scale: 14 / 16 / 20 / 28 / 40px. Line length under 80 characters for body copy.

## Layout concept
- Single accent color per screen moment — don't fire red and gold at once.
- Left-aligned content, no centered hero blocks.
- Dish cards: photo, name, price, one-line description, heart icon (favorite) top
  right of the photo — no drop shadows, use a 1px hairline border instead.
- Category filter as a horizontal scrollable pill row, the active pill filled in
  berbere red, not a boxed tab bar.
- Cart/checkout: a simple single-column receipt-style layout (monospace numerals
  for the ETB total column only — everything else stays in Work Sans).

## Screens to mock up (matches the required routes)
1. Home (`/`) — today's specials strip + link into menu
2. Menu (`/menu`) — category pills, search bar, dish grid, loading/empty/error states
3. Dish detail (`/menu/:id`) — large photo, description, add-to-cart
4. Cart (`/cart`) — line items with qty +/-, running ETB total, empty state
5. Checkout (`/checkout`) — name/phone/area form, validation errors, delivery
   estimate, confirmation screen
6. Favorites (`/favorites`) and Order History (`/orders`) as simpler list variants
   of the Menu/Cart patterns

## What to avoid
- The generic AI-app look: cream background + terracotta accent + rounded cards +
  soft grey shadow everywhere. This spec intentionally uses hairlines instead of
  shadows and a warmer, more saturated palette to sidestep that.
- All-caps section eyebrows, middle-dot metadata strings, arrow-suffixed buttons.

Export frames for all 6 screens (mobile + desktop) as PNG/PDF and submit that file
to Pumble per Step 4 of your brief.
