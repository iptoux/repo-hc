const fs = require("node:fs");
const path = require("node:path");

const BOOTSTRAP_ITEMS = [".agents", "docs", "AGENTS.md"];
const BOOTSTRAP_ALIASES = [{ source: "AGENTS.md", target: "AGENT.md" }];

function ensureDirectory(dirPath, summary) {
  if (fs.existsSync(dirPath)) {
    return;
  }

  fs.mkdirSync(dirPath, { recursive: true });
  summary.createdDirectories += 1;
}

function copyFileSafe(sourceFile, targetFile, force, summary) {
  const fileExists = fs.existsSync(targetFile);
  if (fileExists && !force) {
    summary.skippedFiles += 1;
    return;
  }

  fs.copyFileSync(sourceFile, targetFile);
  summary.copiedFiles += 1;
}

function copyDirectorySafe(sourceDir, targetDir, force, summary) {
  ensureDirectory(targetDir, summary);

  const directoryEntries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of directoryEntries) {
    const sourceEntry = path.join(sourceDir, entry.name);
    const targetEntry = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySafe(sourceEntry, targetEntry, force, summary);
      continue;
    }

    if (entry.isFile()) {
      copyFileSafe(sourceEntry, targetEntry, force, summary);
    }
  }
}

function bootstrapProjectRoot({
  sourceRoot,
  targetRoot,
  force = false,
}) {
  const absoluteSourceRoot = path.resolve(sourceRoot);
  const absoluteTargetRoot = path.resolve(targetRoot);
  const summary = {
    copiedFiles: 0,
    skippedFiles: 0,
    createdDirectories: 0,
    missingSources: [],
  };

  if (absoluteSourceRoot === absoluteTargetRoot) {
    return summary;
  }

  for (const item of BOOTSTRAP_ITEMS) {
    const sourcePath = path.join(absoluteSourceRoot, item);
    const targetPath = path.join(absoluteTargetRoot, item);

    if (!fs.existsSync(sourcePath)) {
      summary.missingSources.push(item);
      continue;
    }

    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      copyDirectorySafe(sourcePath, targetPath, force, summary);
      continue;
    }

    ensureDirectory(path.dirname(targetPath), summary);
    copyFileSafe(sourcePath, targetPath, force, summary);
  }

  for (const alias of BOOTSTRAP_ALIASES) {
    const sourcePath = path.join(absoluteSourceRoot, alias.source);
    const targetPath = path.join(absoluteTargetRoot, alias.target);

    if (!fs.existsSync(sourcePath)) {
      summary.missingSources.push(alias.source);
      continue;
    }

    ensureDirectory(path.dirname(targetPath), summary);
    copyFileSafe(sourcePath, targetPath, force, summary);
  }

  return summary;
}

module.exports = {
  BOOTSTRAP_ALIASES,
  BOOTSTRAP_ITEMS,
  bootstrapProjectRoot,
};
