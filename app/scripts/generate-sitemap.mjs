import { writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { getRequiredEnv } from "./shared/loadEnv.mjs";
import {
  fetchBlogPosts,
  STATIC_SITEMAP_ROUTES,
} from "./shared/prerenderRoutes.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, "..");
const outputPath = resolve(appRoot, "public", "sitemap.xml");

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

async function generateSitemap() {
  const apiUrl = getRequiredEnv("VITE_API_URL", appRoot).replace(/\/$/, "");
  const posts = await fetchBlogPosts(apiUrl);

  const staticEntries = STATIC_SITEMAP_ROUTES.map((route) =>
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
    `Generated sitemap with ${STATIC_SITEMAP_ROUTES.length} static routes and ${posts.length} blog posts.`,
  );
}

generateSitemap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
