# Visual regression (Ashland City Clerk fixture)

Screenshot tests for the pages in `pages.ts`. Playwright opens each path at a
base URL, takes a full-page shot at desktop and mobile, and diffs it against
PNGs in git.

This folder does not start the site. The fixture has to be running first.

## TARGET

- Site: Ashland City Clerk fixture in `site/`
- Tester: `visual/` in this repo
- local: http://127.0.0.1:43123/
- prod: https://aaronlb912.github.io/vrt/
- Pages: `.`, `hours/`, `contact/`
- Auth: none
- Masks: none

Baselines were taken from **local**. Same snapshot names are reused for
`visual:dev` and `visual:prod`. Do not mix a live host into those names unless
you mean to replace the local baselines.

## Prereq

From the repo root:

```
npm start
```

Leaves the clerk site at http://127.0.0.1:43123. If nothing is listening there,
the suite fails with a connection error. It does not skip.

## Install

```
cd visual
npm install
npx playwright install chromium
```

Chromium only.

## Run

From `visual/`:

```
npm run visual              # VISUAL_BASE_URL, or local
npm run visual:local
npm run visual:dev
npm run visual:prod
npm run visual:update       # rewrite baselines
npm run visual:report        # playwright-report/index.html
```

Override the URL without a .env:

```
VISUAL_BASE_URL=http://127.0.0.1:43123 npm run visual
npx playwright test --base-url http://127.0.0.1:43123
```

## Add a page

Append one object to `pages.ts`:

```
{ name: "minutes", path: "minutes/" }
```

`name` is the snapshot id (kebab-case). Run `npm run visual:update`, look at
the new PNGs, commit them with the page list change.

## Update baselines

When the screenshot is the new truth (intentional CSS, copy, layout):

```
npm run visual:update
```

Eyeball the PNGs under `tests/visual.spec.ts-snapshots/`. Commit them with the
site change.

## Reading a fail

1. Run `npm run visual` (or the env you pointed at).
2. If it dies, `npm run visual:report` (or open `playwright-report/index.html`).
3. Open the failed test. Expected is what is in git. Actual is what the site
   did this run. Diff is the red/pink overlay of the change.
4. If the site is wrong, fix the site, re-run. Do not update.
5. If the screenshot is the new truth, `npm run visual:update`, check the PNGs,
   commit them with the site change.

Do not "approve in the cloud." There is no cloud.

Terminal output names the page and viewport (`home desktop`, `contact mobile`).

## Viewports

- desktop: 1280 x 720
- mobile: 390 x 844 (scale factor 1)

Full page, light color scheme. Threshold: `maxDiffPixelRatio` 0.01 in
`playwright.config.ts`.

## Other sites

This folder is the suite. Copy it onto another site, change the URLs in
`playwright.config.ts` and the paths in `pages.ts`, and start that site first.
Details in `../FOR-OTHER-SITES.md`.

## Not covered yet

No auth, no tablet, no dark mode, no sitemap crawl. `visual:prod` hits
https://aaronlb912.github.io/vrt/. Baselines were taken from local, so a prod
run can fail on host-specific bits. One snapshot set, not one per env.
