import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { formatPostDate } from "../shared/formatDate.js";
import { getBlogExcerpt } from "../shared/blogExcerpt.js";
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

  return (
    <div className="container-fluid no-padding latest-blog">
      <div className="container">
        <div className="row">
          <div className="blog-carousel col-md-12 no-padding">
            <article className="type-post">
              <div className="col-md-4 latest-blog__thumb-col">
                <div className="entry-cover entry-cover--square">
                  <Link to={`/blog/post/${latestPost.id}`}>
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
                    <Link
                      to={`/blog/post/${latestPost.id}`}
                      title={latestPost.title}
                    >
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
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestBlogSection;
