#!/usr/bin/env node

const path = require("node:path");
const { bootstrapProjectRoot, BOOTSTRAP_ITEMS } = require("../lib/bootstrap.cjs");
const { maybeConfigureAgentFilesExclude } = require("../lib/vscode-settings.cjs");

function printHelp() {
  console.log("repo-hc");
  console.log("");
  console.log("Usage:");
  console.log("  repo-hc init [--force] [--target <path>]");
  console.log("");
  console.log("Commands:");
  console.log("  init     Copy .agents, docs, and AGENTS.md into a project root.");
  console.log("");
  console.log("Flags:");
  console.log("  --force        Overwrite existing files.");
  console.log("  --target PATH  Target project root (default: current directory).");
}

function parseOptionValue(args, optionName) {
  const optionIndex = args.indexOf(optionName);
  if (optionIndex < 0 || optionIndex + 1 >= args.length) {
    return null;
  }

  return args[optionIndex + 1];
}

function runBootstrap({ targetRoot, force, silent }) {
  const packageRoot = path.resolve(__dirname, "..");
  const summary = bootstrapProjectRoot({
    sourceRoot: packageRoot,
    targetRoot,
    force,
  });

  if (silent) {
    return summary;
  }

  console.log("[repo-hc] Bootstrap completed.");
  console.log(`[repo-hc] Target: ${path.resolve(targetRoot)}`);
  console.log(`[repo-hc] Items: ${BOOTSTRAP_ITEMS.join(", ")}`);
  console.log(`[repo-hc] Copied files: ${summary.copiedFiles}`);
  console.log(`[repo-hc] Skipped existing files: ${summary.skippedFiles}`);
  console.log(`[repo-hc] Created directories: ${summary.createdDirectories}`);
  if (summary.missingSources.length > 0) {
    console.warn(`[repo-hc] Missing package sources: ${summary.missingSources.join(", ")}`);
  }

  return summary;
}

async function runInitCommand(args) {
  const force = args.includes("--force");
  const targetOption = parseOptionValue(args, "--target");
  const targetRoot = targetOption ? path.resolve(targetOption) : process.cwd();
  runBootstrap({ targetRoot, force, silent: false });

  try {
    const vscodeResult = await maybeConfigureAgentFilesExclude({ targetRoot });
    if (vscodeResult.status === "updated") {
      console.log(
        `[repo-hc] Updated ${path.relative(targetRoot, vscodeResult.settingsPath)} with files.exclude entries: ${vscodeResult.addedPatterns.join(", ")}`,
      );
    }
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.warn(`[repo-hc] VS Code settings update skipped: ${message}`);
  }
}

async function main() {
  const [, , command, ...args] = process.argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    await runInitCommand(args);
    return;
  }

  console.error(`[repo-hc] Unknown command: ${command}`);
  printHelp();
  process.exitCode = 1;
}

main().catch((error) => {
  const message = error && error.message ? error.message : String(error);
  console.error(`[repo-hc] Fatal error: ${message}`);
  process.exitCode = 1;
});
