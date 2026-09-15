# Using this on another site

Copy `visual/` into that repo. The suite talks HTTP. It does not mount Drupal
or Next.

1. Start that site at its usual local URL.
2. In the copied `visual/playwright.config.ts`, set `urls.local` (and
   `dev` / `prod` if those hosts exist).
3. Replace the clerk paths in `pages.ts` with routes that already exist.
4. `cd visual && npm install && npx playwright install chromium`
5. `npm run visual:update`, check the PNGs, commit them.

A first slice is enough: home, one inner page, and a form or login if the
site has one.

Baselines are usually from local. Do not mix prod captures into the same
snapshot names unless you mean to replace them.
