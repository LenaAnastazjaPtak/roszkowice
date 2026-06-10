import { readFileSync } from "fs";
import { resolve } from "path";

export function readEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const values = {};

    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();
      values[key] = value;
    }

    return values;
  } catch {
    return {};
  }
}

export function getRequiredEnv(name, appRoot) {
  if (process.env[name]) {
    return process.env[name];
  }

  const localEnv = readEnvFile(resolve(appRoot, ".env.local"));
  const defaultEnv = readEnvFile(resolve(appRoot, ".env"));
  const value = localEnv[name] ?? defaultEnv[name];

  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }

  return value;
}
