import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");

const includedInteractiveFiles = new Set([
  "src/components/interactive/binary-explorer.tsx",
  "src/components/interactive/free-form-question.tsx",
  "src/components/interactive/instructions-body.tsx",
  "src/components/interactive/quiz-gate.tsx",
  "src/components/interactive/question-response.tsx",
]);

const allowedFiles = new Set([
  "src/app/globals.css",
]);

const tokenRadiusClasses = new Set([
  "rounded-control",
  "rounded-surface",
  "rounded-pill",
]);

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) return walk(fullPath);
    if (!/\.(css|tsx|ts)$/.test(entry)) return [];
    return [fullPath];
  });
}

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function shouldScan(rel) {
  if (allowedFiles.has(rel)) return false;
  if (rel.startsWith("src/components/interactive/")) {
    return includedInteractiveFiles.has(rel);
  }
  return rel.startsWith("src/app/") || rel.startsWith("src/components/ui/");
}

function lineAndColumn(source, index) {
  const before = source.slice(0, index);
  const lines = before.split("\n");
  return { line: lines.length, column: lines.at(-1).length + 1 };
}

function report(issues, rel, source, index, message) {
  const { line, column } = lineAndColumn(source, index);
  issues.push(`${rel}:${line}:${column} ${message}`);
}

const issues = [];

for (const filePath of walk(srcRoot)) {
  const rel = relative(filePath);
  if (!shouldScan(rel)) continue;

  const source = readFileSync(filePath, "utf8");

  for (const match of source.matchAll(/\bshadow(?:-[a-z0-9/.[\]]+)?\b|boxShadow/g)) {
    report(issues, rel, source, match.index, "Use the flat system: no shadows in app UI.");
  }

  for (const match of source.matchAll(/\brounded-(?!control\b|surface\b|pill\b)[a-z0-9/.[\]]+/g)) {
    if (tokenRadiusClasses.has(match[0])) continue;
    report(issues, rel, source, match.index, "Use radius tokens: rounded-control, rounded-surface, or rounded-pill.");
  }

  for (const match of source.matchAll(/#[0-9a-fA-F]{3,8}\b|oklch\(/g)) {
    report(issues, rel, source, match.index, "Use color tokens from globals.css instead of hardcoded colors.");
  }
}

if (issues.length > 0) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log("Design check passed.");
