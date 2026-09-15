import { defineConfig, type ViewportSize } from "@playwright/test";

export const urls = {
  local: "http://127.0.0.1:43123/",
  dev: "http://127.0.0.1:43123/",
  prod: "https://aaronlb912.github.io/vrt/",
} as const;

export type NamedEnv = keyof typeof urls;

export const viewports: Record<"desktop" | "mobile", ViewportSize> = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 390, height: 844 },
};

export const maxDiffPixelRatio = 0.01;

function argValue(flag: string): string | undefined {
  const eq = process.argv.find((a) => a.startsWith(`${flag}=`));
  if (eq) return eq.slice(flag.length + 1);
  const idx = process.argv.indexOf(flag);
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith("-")) {
    return process.argv[idx + 1];
  }
  return undefined;
}

export function resolveBaseURL(): string {
  const fromCli = argValue("--base-url") || argValue("--baseURL");
  if (fromCli) return fromCli;

  if (process.env.VISUAL_BASE_URL) return process.env.VISUAL_BASE_URL;

  const named = process.env.VISUAL_ENV as NamedEnv | undefined;
  if (named && urls[named]) return urls[named];

  return urls.local;
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio,
      animations: "disabled",
    },
  },
  use: {
    baseURL: resolveBaseURL(),
    browserName: "chromium",
    colorScheme: "light",
    deviceScaleFactor: 1,
    trace: "off",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
