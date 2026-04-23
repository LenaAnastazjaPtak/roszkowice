import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPostDate } from "../shared/formatDate.js";

function BlogPost({ post, variant = "listing" }) {
  const { t, i18n } = useTranslation("blog");
  const linkToPost = variant === "listing";
  const postUrl = `/blog/post/${post.id}`;
  const { day, month, year } = formatPostDate(
    post.publishedAt,
    i18n.language,
  );

  return (
    <article className="type-post">
      <div className="entry-cover">
        {linkToPost ? (
          <Link to={postUrl}>
            <img src={post.image} alt={t("postAlt")} />
          </Link>
        ) : (
          <img src={post.image} alt={t("postAlt")} />
        )}
      </div>
      <div className="entry-header">
        <div className="post-date">
          <b>{day}</b>
          <span>{month}</span>
          <span>{year}</span>
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
            <span>{post.header}</span>
          </div>
        </div>
      </div>
      <div className="entry-content">
        <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>
      </div>
    </article>
  );
}

export default BlogPost;
