import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { formatPostDate } from "../shared/formatDate.js";
import { getBlogExcerpt } from "../shared/blogExcerpt.js";
import { buildPostPath } from "../shared/postUrl";
import ContentBlockLink from "./ContentBlockLink";
import LoadingSpinner from "./LoadingSpinner";

function LatestBlogSection() {
  const { t } = useTranslation("home");
  const { i18n } = useTranslation();
  const { posts, loading } = useBlogPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  if (loading) {
    return (
      <div className="container-fluid no-padding latest-blog">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!latestPost) return null;

  const { day, month, year } = formatPostDate(
    latestPost.publishedAt,
    i18n.language,
  );
  const postUrl = buildPostPath(latestPost);

  return (
    <div className="container-fluid no-padding latest-blog">
      <div className="container">
        <article className="type-post blog-carousel">
          <div className="row">
            <div className="col-md-4 latest-blog__thumb-col">
              <div className="entry-cover entry-cover--square">
                <Link to={postUrl}>
                  <img src={latestPost.image} alt={latestPost.title} />
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="entry-header">
                <div className="post-date">
                  <b>{day}</b>
                  <span>{month}</span>
                  <span>{year}</span>
                </div>
                <h3 className="entry-title">
                  <Link to={postUrl} title={latestPost.title}>
                    {latestPost.title}
                  </Link>
                </h3>
              </div>
              <div className="entry-content">
                <p>{getBlogExcerpt(latestPost.content)}</p>
                <ContentBlockLink
                  to="/blog"
                  title={t("latestBlog.visitBlog")}
                >
                  {t("latestBlog.visitBlog")}
                </ContentBlockLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default LatestBlogSection;
