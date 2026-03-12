const fs = require("node:fs");
const path = require("node:path");

const BOOTSTRAP_ITEMS = [".agents", "docs", "AGENTS.md"];
const AGENTS_ALWAYS_EXAMPLE_ONLY_AREAS = [
  "learnings",
  "plans",
  "prompts",
  "rules",
];

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

function normalizePathSeparators(value) {
  return value.split(path.sep).join("/");
}

function getAgentsExampleOnlyAreas(agentsSourceDir) {
  if (!fs.existsSync(agentsSourceDir)) {
    return new Set(AGENTS_ALWAYS_EXAMPLE_ONLY_AREAS);
  }

  const entries = fs.readdirSync(agentsSourceDir, { withFileTypes: true });
  const areas = new Set(AGENTS_ALWAYS_EXAMPLE_ONLY_AREAS);
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const examplesPath = path.join(agentsSourceDir, entry.name, "examples");
    if (!fs.existsSync(examplesPath)) {
      continue;
    }

    if (fs.statSync(examplesPath).isDirectory()) {
      areas.add(entry.name);
    }
  }

  return areas;
}

function shouldIncludeAgentsPath({ relativePath, exampleOnlyAreas }) {
  const normalized = normalizePathSeparators(relativePath);
  const area = normalized.split("/")[0];

  if (!exampleOnlyAreas.has(area)) {
    return true;
  }

  if (normalized === area) {
    return true;
  }

  const examplePrefix = `${area}/examples`;
  return normalized === examplePrefix || normalized.startsWith(`${examplePrefix}/`);
}

function createAgentsPathFilter(agentsSourceDir) {
  const exampleOnlyAreas = getAgentsExampleOnlyAreas(agentsSourceDir);
  return ({ relativePath }) => shouldIncludeAgentsPath({
    relativePath,
    exampleOnlyAreas,
  });
}

function copyDirectorySafe(
  sourceDir,
  targetDir,
  force,
  summary,
  options = {},
) {
  const { rootSourceDir = sourceDir, includePath = () => true } = options;
  ensureDirectory(targetDir, summary);

  const directoryEntries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of directoryEntries) {
    const sourceEntry = path.join(sourceDir, entry.name);
    const targetEntry = path.join(targetDir, entry.name);
    const relativePath = path.relative(rootSourceDir, sourceEntry);

    if (entry.isDirectory()) {
      if (!includePath({ relativePath, isDirectory: true })) {
        continue;
      }

      copyDirectorySafe(sourceEntry, targetEntry, force, summary, {
        rootSourceDir,
        includePath,
      });
      continue;
    }

    if (entry.isFile()) {
      if (!includePath({ relativePath, isDirectory: false })) {
        continue;
      }

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
      const includePath = item === ".agents"
        ? createAgentsPathFilter(sourcePath)
        : () => true;

      copyDirectorySafe(sourcePath, targetPath, force, summary, {
        rootSourceDir: sourcePath,
        includePath,
      });
      continue;
    }

    ensureDirectory(path.dirname(targetPath), summary);
    copyFileSafe(sourcePath, targetPath, force, summary);
  }

  return summary;
}

module.exports = {
  AGENTS_ALWAYS_EXAMPLE_ONLY_AREAS,
  BOOTSTRAP_ITEMS,
  bootstrapProjectRoot,
  createAgentsPathFilter,
  getAgentsExampleOnlyAreas,
  shouldIncludeAgentsPath,
};
