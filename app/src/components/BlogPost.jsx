import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPostDate } from "../shared/formatDate.js";
import { getBlogExcerpt } from "../shared/blogExcerpt.js";
import ContentBlockLink from "./ContentBlockLink";

function BlogPost({ post, variant = "listing" }) {
  const { t, i18n } = useTranslation("blog");
  const linkToPost = variant === "listing";
  const isSingle = variant === "single";
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
            <img src={post.image} alt={post.title} />
          </Link>
        ) : (
          <img src={post.image} alt={post.title} />
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
      </div>
      <div className="entry-content">
        <div style={{ whiteSpace: "pre-line" }}>
          {isSingle ? post.content : getBlogExcerpt(post.content)}
        </div>
        {linkToPost && (
          <ContentBlockLink to={postUrl} title={t("readMore")}>
            {t("readMore")}
          </ContentBlockLink>
        )}
      </div>
    </article>
  );
}

export default BlogPost;
