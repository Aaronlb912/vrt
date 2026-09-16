# Visual regression tester

Playwright screenshot diffs for a small Ashland City Clerk site. The tester
lives in `visual/`. The site is a fixture you can run locally or hit on GitHub
Pages.

Walkthrough: what it is, a pass, a broken homepage, then expected / actual /
diff.

https://github.com/user-attachments/assets/0a7781ab-a8f0-4b69-9a2a-f69f3f00a91c

Voice is Microsoft Andrew Neural. Music is Wallpaper by Kevin MacLeod
(incompetech.com), CC BY 3.0.

[Same file in the repo](docs/visual-tester-demo.mp4)

## Fixture

Hosted: https://aaronlb912.github.io/vrt/

```
npm start
```

http://127.0.0.1:43123

- `/` clerk home
- `/hours/`
- `/contact/`

Leave the local process running if you are testing against local. The visual
suite does not start it for you.

## Visual tests

```
cd visual
npm install
npx playwright install chromium
npm run visual:update    # first time: write baselines
npm run visual            # after that: compare
```

Scripts (from `visual/`):

| Script | What it does |
| --- | --- |
| `npm run visual` | Compare against VISUAL_BASE_URL, or local |
| `npm run visual:local` | http://127.0.0.1:43123/ |
| `npm run visual:dev` | same local fixture until a staging URL exists |
| `npm run visual:prod` | https://aaronlb912.github.io/vrt/ |
| `npm run visual:update` | rewrite the PNG baselines |
| `npm run visual:report` | open the last HTML report |

Chromium only. Desktop 1280x720 and mobile 390x844. Page list is `visual/pages.ts`.

## Reading a fail

1. `npm run visual`
2. On a fail, `npm run visual:report`
3. Expected = git. Actual = this run. Diff = the overlay.
4. Site bug: fix the site, re-run. Do not update.
5. Intentional change: `npm run visual:update`, check the PNGs, commit them.

More detail in `visual/README.md`.
