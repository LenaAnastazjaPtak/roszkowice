import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";

function BlogPost({ post, variant = "listing" }) {
  const { t } = useTranslation("blog");
  const { getPostTags } = useBlogPosts();
  const linkToPost = variant === "listing";
  const postUrl = `/blog/post/${post.id}`;

  return (
    <article className="type-post">
      <div className="entry-cover">
        {linkToPost ? (
          <Link to={postUrl}>
            <img src={post.img} alt="Blog" />
          </Link>
        ) : (
          <img src={post.img} alt="Blog" />
        )}
      </div>
      <div className="entry-header">
        <div className="post-date">
          <b>{post.day}</b>
          <span>{t(post.monthKey)}</span>
          <span>{post.year}</span>
        </div>
        <h3 className="entry-title">
          {linkToPost ? (
            <Link to={postUrl} title={post.title}>
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h3>
        <div className="entry-meta">
          <div className="byline">
            <Link to="#" title={post.author}>
              {post.author}
            </Link>
          </div>
        </div>
        {getPostTags(post).length > 0 && (
          <div className="entry-tags">
            {getPostTags(post).map((tagName) => (
              <Link
                key={tagName}
                to={`/blog?tag=${encodeURIComponent(tagName)}`}
                className="tag"
              >
                {tagName}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="entry-content">
        <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>
      </div>
    </article>
  );
}

export default BlogPost;
