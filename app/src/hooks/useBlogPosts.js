import {
  posts,
  getLatestPosts,
  getTagsFromPosts,
  getPostsByTag,
  getPostTags,
} from "../data/blogPosts";

export function useBlogPosts() {
  return {
    posts,
    getLatestPosts,
    getTagsFromPosts,
    getPostsByTag,
    getPostTags,
  };
}
