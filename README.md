# VitalCalc — restructured site

## What changed

Your old site had all 27 calculators living inside **one page** (`index.html`),
switched between with JavaScript tabs. That's why the sitemap tool could only
find 1 URL — there was only ever one URL to find.

This version gives every calculator its **own real page and URL**:

```
index.html                          → homepage / directory of all calculators
bmi-calculator.html                 → BMI
calorie-calculator.html             → Calories (BMR + TDEE combo)
bmr-calculator.html                 → BMR
body-fat-calculator.html            → Body Fat %
ideal-weight-calculator.html        → Ideal Weight
pace-calculator.html                → Pace
army-body-fat-calculator.html       → Army Body Fat
lean-body-mass-calculator.html      → Lean Body Mass
healthy-weight-calculator.html      → Healthy Weight
calories-burned-calculator.html     → Calories Burned
one-rep-max-calculator.html         → One Rep Max
target-heart-rate-calculator.html   → Target Heart Rate
pregnancy-calculator.html           → Pregnancy (weeks along)
pregnancy-weight-gain-calculator.html → Pregnancy Weight Gain
conception-calculator.html          → Conception
due-date-calculator.html            → Due Date
ovulation-calculator.html           → Ovulation
period-calculator.html              → Period
macro-calculator.html               → Macro Split
carbohydrate-calculator.html        → Carbohydrate
protein-calculator.html             → Protein
fat-intake-calculator.html          → Fat Intake
tdee-calculator.html                → TDEE
gfr-calculator.html                 → GFR
body-type-calculator.html           → Body Type
body-surface-area-calculator.html   → Body Surface Area
bac-calculator.html                 → BAC

assets/style.css        → shared design (same colors/fonts as before)
assets/calculators.js   → shared calculator logic (same formulas as before)
sitemap.xml             → now lists all 28 pages instead of 1
robots.txt, ads.txt     → copied through unchanged
```

Every formula is copied exactly from your original file — nothing about how
the numbers are calculated has changed, only how the pages are organized.

The homepage is now a directory: it has a real, clickable link to every one
of the 27 calculators, grouped by category. That's what actually fixes
discoverability — a crawler (or the sitemap tool) can now follow real links
to find every page, not just guess at them.

Things kept exactly as they were, so nothing breaks:
- Google Analytics ID (`G-5784RDJ21Y`)
- AdSense client ID (`pub-2895810972471113`)
- Search Console verification meta tag (kept on the homepage only, same as before)
- `robots.txt` and `ads.txt` (byte-for-byte identical to what you uploaded)

## How to deploy

1. Unzip this folder.
2. Open your `fmcollection.github.io` GitHub repository.
3. Delete the old `index.html` and upload **everything** in this folder in
   its place — keep the `assets/` folder as a folder, don't flatten it.
4. Commit the changes (commit message like "Split into separate calculator pages").
5. Wait 1–2 minutes for GitHub Pages to redeploy, then open
   `https://fmcollection.github.io/bmi-calculator.html` to confirm it's live.
6. In Google Search Console, open **Sitemaps** and resubmit `sitemap.xml`
   (same URL as before — Google will just recrawl it and should now discover
   all 27 pages instead of 1).

## One more thing

Google fully retired the FAQ "dropdown" rich result in Search as of May 2026,
for every kind of site — so the FAQ schema on the homepage is kept for
general value (it still helps AI answer tools understand the content) but
won't produce that expandable box in Google results anymore. Nothing to fix
here, just don't expect that visual.
