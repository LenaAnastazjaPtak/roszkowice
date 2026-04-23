import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { formatPostDate } from "../shared/formatDate.js";
import ContentBlockLink from "./ContentBlockLink";

const EXCERPT_LENGTH = 280;

function getExcerpt(content) {
  if (!content || content.length <= EXCERPT_LENGTH) return content;
  return content.slice(0, EXCERPT_LENGTH).trim() + "...";
}

function LatestBlogSection() {
  const { t } = useTranslation("home");
  const { i18n } = useTranslation();
  const { posts, loading } = useBlogPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  if (loading || !latestPost) return null;

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
                    <img src={latestPost.image} alt="Blog" />
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
                  <p>{getExcerpt(latestPost.content)}</p>
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
