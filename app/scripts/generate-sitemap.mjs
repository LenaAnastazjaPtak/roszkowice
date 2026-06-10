import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, "..");
const outputPath = resolve(appRoot, "public", "sitemap.xml");

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/history", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

function readEnvFile(filePath) {
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

function getRequiredEnv(name) {
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

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLastmod(isoDate) {
  return new Date(isoDate).toISOString().slice(0, 10);
}

function buildUrlEntry({ loc, changefreq, priority, lastmod }) {
  const lines = [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
  ];

  if (lastmod) {
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
  }

  lines.push(`    <changefreq>${changefreq}</changefreq>`);
  lines.push(`    <priority>${priority}</priority>`);
  lines.push("  </url>");

  return lines.join("\n");
}

async function fetchBlogPosts(apiUrl) {
  const response = await fetch(`${apiUrl}/api/posts?locale=pl`);

  if (!response.ok) {
    throw new Error(`API responded with ${response.status}`);
  }

  return response.json();
}

async function generateSitemap() {
  const apiUrl = getRequiredEnv("VITE_API_URL").replace(/\/$/, "");
  const posts = await fetchBlogPosts(apiUrl);

  const staticEntries = STATIC_ROUTES.map((route) =>
    buildUrlEntry({
      loc: `${apiUrl}${route.path}`,
      changefreq: route.changefreq,
      priority: route.priority,
    }),
  );

  const postEntries = posts.map((post) =>
    buildUrlEntry({
      loc: `${apiUrl}/blog/post/${post.id}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: formatLastmod(post.publishedAt),
    }),
  );

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...postEntries,
    "</urlset>",
    "",
  ].join("\n");

  writeFileSync(outputPath, sitemap, "utf8");

  console.log(
    `Generated sitemap with ${STATIC_ROUTES.length} static routes and ${posts.length} blog posts.`,
  );
}

generateSitemap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
