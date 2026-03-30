import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  postDefinitions,
  getLatestPosts,
  getTagsFromPosts,
  getPostsByTag,
  getPostTags,
} from "../data/blogPosts";

export function useBlogPosts() {
  const { t } = useTranslation("blog");
  const posts = useMemo(
    () =>
      postDefinitions.map((post) => {
        const titleKey = `posts.${post.id}.title`;
        const authorKey = `posts.${post.id}.author`;
        const contentKey = `posts.${post.id}.content`;
        const tagsKey = `posts.${post.id}.tags`;

        const title = t(titleKey);
        const author = t(authorKey);
        const content = t(contentKey);
        const tags = t(tagsKey, { returnObjects: true });

        if (
          title === titleKey ||
          author === authorKey ||
          content === contentKey ||
          !Array.isArray(tags)
        ) {
          throw new Error(`Missing blog translation for post id ${post.id}`);
        }

        return {
          ...post,
          title,
          author,
          content,
          tags,
        };
      }),
    [t],
  );

  return {
    posts,
    getLatestPosts: (translationFn) => getLatestPosts(posts, translationFn),
    getTagsFromPosts: () => getTagsFromPosts(posts),
    getPostsByTag: (tag) => getPostsByTag(posts, tag),
    getPostTags,
  };
}
