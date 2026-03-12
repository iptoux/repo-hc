const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { bootstrapProjectRoot } = require("../lib/bootstrap.cjs");

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

test("bootstrap copies required assets into target root", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-bootstrap-"));
  const sourceRoot = path.join(workspace, "source");
  const targetRoot = path.join(workspace, "target");

  writeFile(path.join(sourceRoot, ".agents", "rules", "examples", "01_rule.md"), "rule");
  writeFile(path.join(sourceRoot, "docs", "README.md"), "docs");
  writeFile(path.join(sourceRoot, "AGENTS.md"), "agents");
  fs.mkdirSync(targetRoot, { recursive: true });

  const summary = bootstrapProjectRoot({ sourceRoot, targetRoot, force: false });
  assert.equal(summary.copiedFiles, 3);
  assert.equal(summary.skippedFiles, 0);
  assert.equal(summary.missingSources.length, 0);

  assert.equal(fs.readFileSync(path.join(targetRoot, "AGENTS.md"), "utf8"), "agents");
  assert.equal(
    fs.readFileSync(path.join(targetRoot, ".agents", "rules", "examples", "01_rule.md"), "utf8"),
    "rule",
  );
  assert.equal(fs.readFileSync(path.join(targetRoot, "docs", "README.md"), "utf8"), "docs");
});

test("bootstrap skips existing files unless force is enabled", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-bootstrap-"));
  const sourceRoot = path.join(workspace, "source");
  const targetRoot = path.join(workspace, "target");

  writeFile(path.join(sourceRoot, "AGENTS.md"), "new-content");
  writeFile(path.join(sourceRoot, ".agents", "rules", "examples", "01_rule.md"), "new-rule");
  writeFile(path.join(sourceRoot, "docs", "README.md"), "new-docs");

  writeFile(path.join(targetRoot, "AGENTS.md"), "existing-content");
  writeFile(path.join(targetRoot, ".agents", "rules", "examples", "01_rule.md"), "existing-rule");
  writeFile(path.join(targetRoot, "docs", "README.md"), "existing-docs");

  const skippedSummary = bootstrapProjectRoot({ sourceRoot, targetRoot, force: false });
  assert.equal(skippedSummary.copiedFiles, 0);
  assert.equal(skippedSummary.skippedFiles, 3);
  assert.equal(fs.readFileSync(path.join(targetRoot, "AGENTS.md"), "utf8"), "existing-content");

  const forcedSummary = bootstrapProjectRoot({ sourceRoot, targetRoot, force: true });
  assert.equal(forcedSummary.copiedFiles, 3);
  assert.equal(fs.readFileSync(path.join(targetRoot, "AGENTS.md"), "utf8"), "new-content");
});

test("bootstrap copies only examples for rules/learnings/plans/prompts under .agents", () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "repo-hc-bootstrap-"));
  const sourceRoot = path.join(workspace, "source");
  const targetRoot = path.join(workspace, "target");

  writeFile(path.join(sourceRoot, ".agents", "README.md"), "agents-readme");
  writeFile(path.join(sourceRoot, ".agents", "rules", "real.md"), "real-rule");
  writeFile(path.join(sourceRoot, ".agents", "rules", "examples", "sample.md"), "example-rule");
  writeFile(path.join(sourceRoot, ".agents", "learnings", "real.md"), "real-learning");
  writeFile(path.join(sourceRoot, ".agents", "learnings", "examples", "sample.md"), "example-learning");
  writeFile(path.join(sourceRoot, ".agents", "plans", "real.md"), "real-plan");
  writeFile(path.join(sourceRoot, ".agents", "plans", "examples", "sample.md"), "example-plan");
  writeFile(path.join(sourceRoot, ".agents", "prompts", "real.md"), "real-prompt");
  writeFile(path.join(sourceRoot, ".agents", "prompts", "examples", "sample.md"), "example-prompt");
  writeFile(path.join(sourceRoot, "docs", "README.md"), "docs");
  writeFile(path.join(sourceRoot, "AGENTS.md"), "agents");
  fs.mkdirSync(targetRoot, { recursive: true });

  bootstrapProjectRoot({ sourceRoot, targetRoot, force: false });

  assert.equal(fs.existsSync(path.join(targetRoot, ".agents", "README.md")), true);

  assert.equal(
    fs.existsSync(path.join(targetRoot, ".agents", "rules", "examples", "sample.md")),
    true,
  );
  assert.equal(fs.existsSync(path.join(targetRoot, ".agents", "rules", "real.md")), false);

  assert.equal(
    fs.existsSync(path.join(targetRoot, ".agents", "learnings", "examples", "sample.md")),
    true,
  );
  assert.equal(fs.existsSync(path.join(targetRoot, ".agents", "learnings", "real.md")), false);

  assert.equal(
    fs.existsSync(path.join(targetRoot, ".agents", "plans", "examples", "sample.md")),
    true,
  );
  assert.equal(fs.existsSync(path.join(targetRoot, ".agents", "plans", "real.md")), false);

  assert.equal(
    fs.existsSync(path.join(targetRoot, ".agents", "prompts", "examples", "sample.md")),
    true,
  );
  assert.equal(fs.existsSync(path.join(targetRoot, ".agents", "prompts", "real.md")), false);
});
