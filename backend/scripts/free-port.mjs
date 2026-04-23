import { execSync } from "node:child_process";

const rawPort = process.argv[2];
const port = Number(rawPort);

if (!Number.isInteger(port) || port <= 0) {
  process.exit(0);
}

if (process.platform === "win32") {
  try {
    const output = execSync(`netstat -ano | findstr ":${port}"`, { encoding: "utf8" });
    const pids = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split(/\s+/).at(-1))
      .filter((value) => /^\d+$/.test(value))
      .filter((value) => value !== "0");

    [...new Set(pids)].forEach((pid) => {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      } catch {}
    });
  } catch {}
  process.exit(0);
}

try {
  const output = execSync(`lsof -ti tcp:${port}`, { encoding: "utf8" });
  const pids = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((value) => /^\d+$/.test(value));

  [...new Set(pids)].forEach((pid) => {
    try {
      process.kill(Number(pid), "SIGKILL");
    } catch {}
  });
} catch {}
