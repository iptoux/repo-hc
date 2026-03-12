const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline/promises");

const VSCODE_SETTINGS_RELATIVE_PATH = path.join(".vscode", "settings.json");
const AGENT_FILES_EXCLUDE_DEFAULTS = {
  ".agents": true,
  "AGENTS.md": true,
};

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stripJsonComments(content) {
  let output = "";
  let inString = false;
  let isEscaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = 0; index < content.length; index += 1) {
    const current = content[index];
    const next = content[index + 1];

    if (inLineComment) {
      if (current === "\n" || current === "\r") {
        inLineComment = false;
        output += current;
      }
      continue;
    }

    if (inBlockComment) {
      if (current === "*" && next === "/") {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }

    if (inString) {
      output += current;
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (current === "\\") {
        isEscaped = true;
        continue;
      }

      if (current === "\"") {
        inString = false;
      }
      continue;
    }

    if (current === "\"") {
      inString = true;
      output += current;
      continue;
    }

    if (current === "/" && next === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (current === "/" && next === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }

    output += current;
  }

  return output;
}

function removeTrailingCommas(content) {
  let output = "";
  let inString = false;
  let isEscaped = false;

  for (let index = 0; index < content.length; index += 1) {
    const current = content[index];

    if (inString) {
      output += current;
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (current === "\\") {
        isEscaped = true;
        continue;
      }

      if (current === "\"") {
        inString = false;
      }
      continue;
    }

    if (current === "\"") {
      inString = true;
      output += current;
      continue;
    }

    if (current === ",") {
      let lookAhead = index + 1;
      while (lookAhead < content.length && /\s/.test(content[lookAhead])) {
        lookAhead += 1;
      }

      if (content[lookAhead] === "}" || content[lookAhead] === "]") {
        continue;
      }
    }

    output += current;
  }

  return output;
}

function parseJsonWithComments(content) {
  const withoutComments = stripJsonComments(content);
  const normalized = removeTrailingCommas(withoutComments);
  return JSON.parse(normalized);
}

function loadSettingsFile(settingsPath) {
  if (!fs.existsSync(settingsPath)) {
    return {};
  }

  const raw = fs.readFileSync(settingsPath, "utf8");
  let parsed;
  try {
    parsed = parseJsonWithComments(raw);
  } catch (error) {
    throw new Error(`Unable to parse JSON in ${settingsPath}: ${error.message}`);
  }

  if (!isPlainObject(parsed)) {
    throw new Error(`Expected a JSON object in ${settingsPath}.`);
  }

  return parsed;
}

function mergeFilesExcludeSettings(settings, excludes = AGENT_FILES_EXCLUDE_DEFAULTS) {
  const nextSettings = { ...settings };
  const existingExcludes = nextSettings["files.exclude"];

  if (existingExcludes !== undefined && !isPlainObject(existingExcludes)) {
    throw new Error("Expected `files.exclude` to be a JSON object.");
  }

  const mergedExcludes = isPlainObject(existingExcludes) ? { ...existingExcludes } : {};
  const addedPatterns = [];

  for (const [pattern, hidden] of Object.entries(excludes)) {
    if (mergedExcludes[pattern] === undefined) {
      mergedExcludes[pattern] = hidden;
      addedPatterns.push(pattern);
    }
  }

  if (addedPatterns.length === 0) {
    return {
      changed: false,
      settings: nextSettings,
      addedPatterns,
    };
  }

  nextSettings["files.exclude"] = mergedExcludes;
  return {
    changed: true,
    settings: nextSettings,
    addedPatterns,
  };
}

function canPromptForInput({ stdin, stdout }) {
  return Boolean(stdin && stdout && stdin.isTTY && stdout.isTTY);
}

async function promptYesNo({ stdin, stdout, question }) {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(question);
    const normalized = answer.trim().toLowerCase();
    return normalized === "y" || normalized === "yes";
  } finally {
    rl.close();
  }
}

function writeSettingsFile(settingsPath, settings) {
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`, "utf8");
}

async function maybeConfigureAgentFilesExclude({
  targetRoot,
  excludes = AGENT_FILES_EXCLUDE_DEFAULTS,
  stdin = process.stdin,
  stdout = process.stdout,
  confirmFn,
}) {
  const settingsPath = path.join(path.resolve(targetRoot), VSCODE_SETTINGS_RELATIVE_PATH);
  const existingSettings = loadSettingsFile(settingsPath);
  const mergedResult = mergeFilesExcludeSettings(existingSettings, excludes);

  if (!mergedResult.changed) {
    return {
      status: "already-configured",
      settingsPath,
      addedPatterns: [],
    };
  }

  if (!canPromptForInput({ stdin, stdout })) {
    return {
      status: "prompt-skipped-non-interactive",
      settingsPath,
      addedPatterns: mergedResult.addedPatterns,
    };
  }

  const shouldApply = confirmFn
    ? await confirmFn()
    : await promptYesNo({
      stdin,
      stdout,
      question:
          "[repo-hc] Hide common agent files/directories in VS Code? (.agents, AGENTS.md) [y/N]: ",
    });

  if (!shouldApply) {
    return {
      status: "declined",
      settingsPath,
      addedPatterns: mergedResult.addedPatterns,
    };
  }

  writeSettingsFile(settingsPath, mergedResult.settings);
  return {
    status: "updated",
    settingsPath,
    addedPatterns: mergedResult.addedPatterns,
  };
}

module.exports = {
  AGENT_FILES_EXCLUDE_DEFAULTS,
  VSCODE_SETTINGS_RELATIVE_PATH,
  canPromptForInput,
  loadSettingsFile,
  mergeFilesExcludeSettings,
  maybeConfigureAgentFilesExclude,
  parseJsonWithComments,
  removeTrailingCommas,
  stripJsonComments,
  writeSettingsFile,
};
