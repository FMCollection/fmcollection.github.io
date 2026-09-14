# VitalCalc

**Free BMI, calorie, body fat, pregnancy, and fitness calculators — no sign-up, nothing stored.**

🔗 Live site: [fmcollection.github.io](https://fmcollection.github.io)

VitalCalc is a static, ad-supported collection of 27 health and fitness calculators built on standard, published medical and fitness formulas. Every calculation runs entirely in the visitor's browser — no data is collected, stored, or sent to a server.

---

## Features

- **27 calculators** across body composition, energy/diet, fitness, and pregnancy/cycle tracking
- **Metric and imperial** input support
- **Zero backend** — pure HTML/CSS/JS, calculations run client-side
- **Privacy-first** — no inputs are logged, stored, or transmitted anywhere
- **SEO-friendly structure** — every calculator has its own indexable URL, listed in `sitemap.xml`
- Monetized via **Google AdSense**, traffic measured via **Google Analytics**

## Calculators

| Category | Calculators |
|---|---|
| **Body composition & weight** | BMI · Body Fat % (Navy method) · Ideal Weight (Devine) · Lean Body Mass · Healthy Weight · Army Body Fat · Body Type · Body Surface Area (Mosteller) |
| **Energy & diet** | Calories (BMR + TDEE) · BMR (Mifflin-St Jeor) · TDEE · Macro Split · Carbohydrate · Protein · Fat Intake |
| **Fitness & performance** | Pace · Calories Burned · One Rep Max (Epley) · Target Heart Rate |
| **Pregnancy & cycle** | Pregnancy (weeks along) · Pregnancy Weight Gain (IOM) · Conception · Due Date (Naegele's rule) · Ovulation · Period |
| **Clinical reference** | GFR · BAC (Widmark formula) |

## Project structure

```
index.html                              → homepage / directory of all calculators
bmi-calculator.html                     → BMI
calorie-calculator.html                 → Calories (BMR + TDEE)
bmr-calculator.html                     → BMR
body-fat-calculator.html                → Body Fat %
ideal-weight-calculator.html            → Ideal Weight
pace-calculator.html                    → Pace
army-body-fat-calculator.html           → Army Body Fat
lean-body-mass-calculator.html          → Lean Body Mass
healthy-weight-calculator.html          → Healthy Weight
calories-burned-calculator.html         → Calories Burned
one-rep-max-calculator.html             → One Rep Max
target-heart-rate-calculator.html       → Target Heart Rate
pregnancy-calculator.html               → Pregnancy
pregnancy-weight-gain-calculator.html   → Pregnancy Weight Gain
conception-calculator.html              → Conception
due-date-calculator.html                → Due Date
ovulation-calculator.html               → Ovulation
period-calculator.html                  → Period
macro-calculator.html                   → Macro Split
carbohydrate-calculator.html            → Carbohydrate
protein-calculator.html                 → Protein
fat-intake-calculator.html              → Fat Intake
tdee-calculator.html                    → TDEE
gfr-calculator.html                     → GFR
body-type-calculator.html               → Body Type
body-surface-area-calculator.html       → Body Surface Area
bac-calculator.html                     → BAC

assets/
  style.css                             → shared design system
  calculators.js                        → shared calculator logic

sitemap.xml                             → all indexable pages
robots.txt                              → crawler rules
ads.txt                                 → AdSense authorization
```

## Formulas used

| Calculator | Method |
|---|---|
| BMR / TDEE | Mifflin-St Jeor equation |
| Ideal Weight | Devine formula |
| Body Fat % / Army Body Fat | U.S. Navy circumference method |
| Body Surface Area | Mosteller formula |
| One Rep Max | Epley formula: `1RM = weight × (1 + reps ÷ 30)` |
| Target Heart Rate | 220 − age (age-predicted max) |
| Due Date / Conception / Ovulation / Period | Naegele's rule (280 days from last period, 28-day cycle default) |
| Pregnancy Weight Gain | IOM guidelines by pre-pregnancy BMI category |
| BAC | Widmark formula |

All formulas are standard and published — nothing proprietary. Results are estimates and are clearly labeled as such throughout the site.

## Running locally

No build step or dependencies. Clone the repo and open `index.html` directly, or serve it with any static server:

```bash
git clone https://github.com/fmcollection/fmcollection.github.io.git
cd fmcollection.github.io
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

This repo is served directly by **GitHub Pages** from the `main` branch — any commit to `main` goes live within 1–2 minutes at [fmcollection.github.io](https://fmcollection.github.io).

After structural changes (new pages, renamed files), resubmit `sitemap.xml` in **Google Search Console → Sitemaps** so it gets recrawled.

## Disclaimer & privacy

VitalCalc is provided for general informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making significant changes to diet, exercise, or in response to any calculator result — particularly for the GFR, BAC, and pregnancy tools.

No inputs are collected, stored, or transmitted — every calculation runs locally in the browser. The site uses Google Analytics for traffic measurement and may display Google AdSense advertising; both may use cookies to collect data such as IP address and browsing behavior for ad personalization.

## Contact

Questions or feedback: **hhina7328@gmail.com**

---

© 2026 VitalCalc. Estimates only — not a substitute for professional medical advice.
