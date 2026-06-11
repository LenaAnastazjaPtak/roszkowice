const EXCERPT_LENGTH = 280;

export function getBlogExcerpt(content) {
  if (!content || content.length <= EXCERPT_LENGTH) return content;
  return content.slice(0, EXCERPT_LENGTH).trim() + "...";
}
