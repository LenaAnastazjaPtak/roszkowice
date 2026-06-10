import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { createServer } from "node:net";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";
import { getRequiredEnv } from "./shared/loadEnv.mjs";
import { getPrerenderRoutes } from "./shared/prerenderRoutes.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, "..");
const distDir = resolve(appRoot, "dist");
const previewHost = "127.0.0.1";

function getAvailablePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.listen(0, previewHost, () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
    server.on("error", reject);
  });
}

function routeToOutputPath(route) {
  if (route === "/") {
    return resolve(distDir, "index.html");
  }

  const segments = route.replace(/^\//, "").split("/");
  return resolve(distDir, ...segments, "index.html");
}

function startPreviewServer(previewPort) {
  const previewUrl = `http://${previewHost}:${previewPort}`;
  let started = false;

  return new Promise((resolvePromise, reject) => {
    const previewProcess = spawn(
      "npx",
      [
        "vite",
        "preview",
        "--host",
        previewHost,
        "--port",
        String(previewPort),
        "--strictPort",
      ],
      {
        cwd: appRoot,
        stdio: "ignore",
        shell: true,
      },
    );

    previewProcess.on("error", reject);
    previewProcess.on("exit", (code) => {
      if (!started) {
        reject(new Error(`Preview server exited with code ${code}`));
      }
    });

    const waitUntilReady = async () => {
      const deadline = Date.now() + 60000;

      while (Date.now() < deadline) {
        try {
          const response = await fetch(previewUrl);

          if (response.ok) {
            started = true;
            resolvePromise({ previewProcess, previewUrl });
            return;
          }
        } catch {
          // Preview is still starting.
        }

        await new Promise((resolveDelay) => setTimeout(resolveDelay, 300));
      }

      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(previewProcess.pid), "/f", "/t"], {
          shell: true,
          stdio: "ignore",
        });
      } else {
        previewProcess.kill("SIGTERM");
      }

      reject(
        new Error(
          "Preview server startup timed out. Run `npm run build` first and stop other preview/dev servers.",
        ),
      );
    };

    waitUntilReady();
  });
}

async function waitForRouteReady(page, route) {
  await page.waitForSelector('[data-prerender-ready="true"]', {
    timeout: 30000,
  });

  if (route === "/") {
    await page.waitForSelector("#welcome-section", { timeout: 20000 });
  } else if (route === "/blog") {
    await page.waitForSelector(".blog-listing .type-post, .blog-no-results", {
      timeout: 30000,
    });
  } else if (route.startsWith("/blog/post/")) {
    await page.waitForFunction(
      () => {
        const title = document.querySelector(".blog-single .entry-title");
        return Boolean(title && title.textContent.trim().length > 0);
      },
      { timeout: 45000 },
    );
  } else if (route === "/gallery") {
    await page.waitForFunction(
      () =>
        document.querySelector(".portfolio-section .portfolio-box img") ||
        document.querySelector(".portfolio-section-gallery-wrap .text-center"),
      { timeout: 30000 },
    );
  } else {
    await page.waitForSelector("main", { timeout: 20000 });
  }

  await new Promise((resolveDelay) => {
    setTimeout(resolveDelay, 500);
  });
}

function mergePrerenderedHomeShell(shellHtml, prerenderedHtml) {
  const prerenderedHead = prerenderedHtml.match(/<head[^>]*>[\s\S]*?<\/head>/i)?.[0];

  if (!prerenderedHead) {
    return shellHtml;
  }

  return shellHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/i, prerenderedHead);
}

function orderRoutes(routes) {
  const withoutHome = routes.filter((route) => route !== "/");

  if (routes.includes("/")) {
    return [...withoutHome, "/"];
  }

  return withoutHome;
}

function normalizePrerenderedHtml(html, previewUrl, siteUrl) {
  return html.replaceAll(previewUrl, siteUrl);
}

async function prerenderRoute(page, route, previewUrl, spaShellHtml, siteUrl) {
  const url = `${previewUrl}${route}`;
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000,
  });
  await waitForRouteReady(page, route);

  const html = normalizePrerenderedHtml(await page.content(), previewUrl, siteUrl);
  const outputPath = routeToOutputPath(route);
  mkdirSync(dirname(outputPath), { recursive: true });

  if (route === "/") {
    writeFileSync(outputPath, mergePrerenderedHomeShell(spaShellHtml, html), "utf8");
    return;
  }

  writeFileSync(outputPath, html, "utf8");
}

async function setupApiProxy(page, apiUrl) {
  await page.setRequestInterception(true);

  page.on("request", async (request) => {
    const requestUrl = new URL(request.url());

    if (!requestUrl.pathname.startsWith("/api/")) {
      await request.continue();
      return;
    }

    if (request.method() === "OPTIONS") {
      await request.respond({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, OPTIONS",
          "access-control-allow-headers": "*",
        },
      });
      return;
    }

    const targetUrl = `${apiUrl}${requestUrl.pathname}${requestUrl.search}`;

    try {
      const response = await fetch(targetUrl);
      const headers = {
        "access-control-allow-origin": "*",
      };

      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      await request.respond({
        status: response.status,
        headers,
        body: Buffer.from(await response.arrayBuffer()),
      });
    } catch {
      await request.abort();
    }
  });
}

async function prerender() {
  if (!existsSync(distDir)) {
    throw new Error("Missing dist directory. Run vite build first.");
  }

  const apiUrl = getRequiredEnv("VITE_API_URL", appRoot).replace(/\/$/, "");
  const routes = orderRoutes(await getPrerenderRoutes(apiUrl));
  const spaShellHtml = readFileSync(resolve(distDir, "index.html"), "utf8");
  const previewPort = await getAvailablePort();
  const { previewProcess, previewUrl } = await startPreviewServer(previewPort);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await setupApiProxy(page, apiUrl);

    for (const route of routes) {
      await prerenderRoute(page, route, previewUrl, spaShellHtml, apiUrl);
      console.log(`Prerendered ${route}`);
    }

    console.log(`Prerendered ${routes.length} routes.`);
  } finally {
    await browser.close();

    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(previewProcess.pid), "/f", "/t"], {
        shell: true,
        stdio: "ignore",
      });
    } else {
      previewProcess.kill("SIGTERM");
    }
  }
}

prerender().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
