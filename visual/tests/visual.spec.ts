import { test, expect } from "@playwright/test";
import { pages } from "../pages";
import { viewports } from "../playwright.config";

const disableMotion = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`;

for (const pageDef of pages) {
  for (const [viewportName, size] of Object.entries(viewports)) {
    test(`${pageDef.name} ${viewportName}`, async ({ page }) => {
      await page.setViewportSize(size);
      const response = await page.goto(pageDef.path, { waitUntil: "load" });
      if (!response) {
        throw new Error(`No response from ${pageDef.path}`);
      }
      if (!response.ok()) {
        throw new Error(
          `${response.status()} at ${response.url()} (base URL ${page.url()})`,
        );
      }
      await page.locator("main").waitFor();
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      await page.addStyleTag({ content: disableMotion });

      await expect(page).toHaveScreenshot(`${pageDef.name}-${viewportName}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
