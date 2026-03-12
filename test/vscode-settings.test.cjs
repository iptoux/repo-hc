const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  AGENT_FILES_EXCLUDE_DEFAULTS,
  mergeFilesExcludeSettings,
  maybeConfigureAgentFilesExclude,
  parseJsonWithComments,
} = require("../lib/vscode-settings.cjs");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

test("mergeFilesExcludeSettings adds missing agent patterns and preserves existing settings", () => {
  const existing = {
    "editor.tabSize": 2,
    "files.exclude": {
      "node_modules": true,
      "AGENTS.md": false,
    },
  };

  const result = mergeFilesExcludeSettings(existing, AGENT_FILES_EXCLUDE_DEFAULTS);
  assert.equal(result.changed, true);
  assert.deepEqual(result.addedPatterns.sort(), [".agents"].sort());
  assert.equal(result.settings["files.exclude"]["AGENTS.md"], false);
  assert.equal(result.settings["files.exclude"][".agents"], true);
  assert.equal(result.settings["files.exclude"]["node_modules"], true);
  assert.equal(result.settings["editor.tabSize"], 2);
});

test("parseJsonWithComments supports VS Code style comments and trailing commas", () => {
  const parsed = parseJsonWithComments(`{
    // explorer preferences
    "files.exclude": {
      ".agents": true,
      "AGENTS.md": true,
    },
    /* editor settings */
    "editor.tabSize": 2,
  }`);

  assert.equal(parsed["files.exclude"][".agents"], true);
  assert.equal(parsed["files.exclude"]["AGENTS.md"], true);
  assert.equal(parsed["editor.tabSize"], 2);
});

test("maybeConfigureAgentFilesExclude writes .vscode/settings.json when user confirms", async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-vscode-"));
  const targetRoot = path.join(workspace, "target");
  fs.mkdirSync(targetRoot, { recursive: true });

  const result = await maybeConfigureAgentFilesExclude({
    targetRoot,
    stdin: { isTTY: true },
    stdout: { isTTY: true },
    confirmFn: async () => true,
  });

  assert.equal(result.status, "updated");

  const settingsPath = path.join(targetRoot, ".vscode", "settings.json");
  assert.equal(fs.existsSync(settingsPath), true);
  const writtenSettings = readJson(settingsPath);
  assert.equal(writtenSettings["files.exclude"][".agents"], true);
  assert.equal(writtenSettings["files.exclude"]["AGENTS.md"], true);
});

test("maybeConfigureAgentFilesExclude skips write when user declines", async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-vscode-"));
  const targetRoot = path.join(workspace, "target");
  fs.mkdirSync(targetRoot, { recursive: true });

  const result = await maybeConfigureAgentFilesExclude({
    targetRoot,
    stdin: { isTTY: true },
    stdout: { isTTY: true },
    confirmFn: async () => false,
  });

  assert.equal(result.status, "declined");
  assert.equal(fs.existsSync(path.join(targetRoot, ".vscode", "settings.json")), false);
});

test("maybeConfigureAgentFilesExclude skips prompt in non-interactive mode", async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-vscode-"));
  const targetRoot = path.join(workspace, "target");
  fs.mkdirSync(targetRoot, { recursive: true });

  const result = await maybeConfigureAgentFilesExclude({
    targetRoot,
    stdin: { isTTY: false },
    stdout: { isTTY: false },
  });

  assert.equal(result.status, "prompt-skipped-non-interactive");
  assert.equal(fs.existsSync(path.join(targetRoot, ".vscode", "settings.json")), false);
});

test("maybeConfigureAgentFilesExclude is idempotent when all exclude patterns already exist", async () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-vscode-"));
  const targetRoot = path.join(workspace, "target");
  const settingsPath = path.join(targetRoot, ".vscode", "settings.json");
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(
    settingsPath,
    JSON.stringify(
      {
        "files.exclude": {
          ".agents": true,
          "AGENTS.md": true,
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  const result = await maybeConfigureAgentFilesExclude({
    targetRoot,
    stdin: { isTTY: true },
    stdout: { isTTY: true },
    confirmFn: async () => {
      throw new Error("confirmFn should not be called when already configured");
    },
  });

  assert.equal(result.status, "already-configured");
});
