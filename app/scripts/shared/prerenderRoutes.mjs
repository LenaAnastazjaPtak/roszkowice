export const STATIC_PRERENDER_ROUTES = [
  "/",
  "/about",
  "/history",
  "/gallery",
  "/blog",
  "/contact",
  "/privacy-policy",
];

export const STATIC_SITEMAP_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/history", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

export async function fetchBlogPosts(apiUrl) {
  const response = await fetch(`${apiUrl}/api/posts?locale=pl`);

  if (!response.ok) {
    throw new Error(`API responded with ${response.status}`);
  }

  return response.json();
}

export async function getPrerenderRoutes(apiUrl) {
  const posts = await fetchBlogPosts(apiUrl);
  const blogPostRoutes = posts.map((post) => `/blog/post/${post.id}`);

  return [...STATIC_PRERENDER_ROUTES, ...blogPostRoutes];
}
