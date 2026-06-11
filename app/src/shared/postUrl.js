export function slugify(text) {
  return text
    .toLowerCase()
    .replaceAll("ł", "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildPostPath(post) {
  return `/blog/post/${post.id}-${slugify(post.title)}`;
}

export function extractPostId(slugParam) {
  const match = /^(\d+)/.exec(slugParam);
  return match ? match[1] : null;
}
