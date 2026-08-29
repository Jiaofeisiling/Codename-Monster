#!/usr/bin/env node
process.env.CI = "false";
process.env.DISABLE_ESLINT_PLUGIN = "true";
const { spawnSync } = require("child_process");
const result = spawnSync("npx", ["react-scripts", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
process.exit(result.status ?? 1);
