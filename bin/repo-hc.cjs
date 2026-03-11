#!/usr/bin/env node

const path = require("node:path");
const { bootstrapProjectRoot, BOOTSTRAP_ITEMS } = require("../lib/bootstrap.cjs");

function printHelp() {
  console.log("repo-hc");
  console.log("");
  console.log("Usage:");
  console.log("  repo-hc init [--force] [--target <path>]");
  console.log("  repo-hc install");
  console.log("");
  console.log("Commands:");
  console.log("  init     Copy .agents, docs, AGENTS.md and compatibility AGENT.md into a project root.");
  console.log("  install  Internal command used by postinstall.");
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
  console.log(`[repo-hc] Items: ${BOOTSTRAP_ITEMS.join(", ")} + AGENT.md compatibility alias`);
  console.log(`[repo-hc] Copied files: ${summary.copiedFiles}`);
  console.log(`[repo-hc] Skipped existing files: ${summary.skippedFiles}`);
  console.log(`[repo-hc] Created directories: ${summary.createdDirectories}`);
  if (summary.missingSources.length > 0) {
    console.warn(`[repo-hc] Missing package sources: ${summary.missingSources.join(", ")}`);
  }

  return summary;
}

function runInitCommand(args) {
  const force = args.includes("--force");
  const targetOption = parseOptionValue(args, "--target");
  const targetRoot = targetOption ? path.resolve(targetOption) : process.cwd();
  runBootstrap({ targetRoot, force, silent: false });
}

function runInstallCommand() {
  if (process.env.REPO_HC_SKIP_POSTINSTALL === "1") {
    return;
  }

  if (process.env.npm_config_global === "true") {
    return;
  }

  const targetRoot = process.env.INIT_CWD
    ? path.resolve(process.env.INIT_CWD)
    : process.cwd();

  try {
    runBootstrap({ targetRoot, force: false, silent: true });
  } catch (error) {
    // Never break installation if bootstrap fails during postinstall.
    const message = error && error.message ? error.message : String(error);
    console.warn(`[repo-hc] postinstall bootstrap skipped: ${message}`);
  }
}

function main() {
  const [, , command, ...args] = process.argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    runInitCommand(args);
    return;
  }

  if (command === "install") {
    runInstallCommand();
    return;
  }

  console.error(`[repo-hc] Unknown command: ${command}`);
  printHelp();
  process.exitCode = 1;
}

main();