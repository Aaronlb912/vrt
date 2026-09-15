const { spawn } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
const env = { ...process.env };
const forwarded = [];

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--base-url" || a === "--baseURL") {
    env.VISUAL_BASE_URL = args[++i];
    continue;
  }
  if (a.startsWith("--base-url=")) {
    env.VISUAL_BASE_URL = a.slice("--base-url=".length);
    continue;
  }
  if (a.startsWith("--baseURL=")) {
    env.VISUAL_BASE_URL = a.slice("--baseURL=".length);
    continue;
  }
  forwarded.push(a);
}

const bin = path.join(__dirname, "node_modules", ".bin", "playwright");
const child = spawn(bin, ["test", ...forwarded], {
  stdio: "inherit",
  env,
  cwd: __dirname,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
