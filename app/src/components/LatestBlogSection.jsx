import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import ContentBlockLink from "./ContentBlockLink";

const EXCERPT_LENGTH = 280;

function getExcerpt(content) {
  if (!content || content.length <= EXCERPT_LENGTH) return content;
  return content.slice(0, EXCERPT_LENGTH).trim() + "...";
}

function LatestBlogSection() {
  const { t } = useTranslation("home");
  const { t: tBlog } = useTranslation("blog");
  const { posts } = useBlogPosts();
  const latestPost = posts.length > 0 ? posts[posts.length - 1] : null;

  if (!latestPost) return null;

  return (
    <div className="container-fluid no-padding latest-blog">
      <div className="container">
        <div className="row">
          <div className="blog-carousel col-md-12 no-padding">
            <article className="type-post">
              <div className="col-md-4 latest-blog__thumb-col">
                <div className="entry-cover entry-cover--square">
                  <Link to={`/blog/post/${latestPost.id}`} className="img-hover-zoom">
                    <img src={latestPost.img} alt="Blog" />
                  </Link>
                </div>
              </div>
              <div className="col-md-8">
                <div className="entry-header">
                  <div className="post-date">
                    <b>{latestPost.day}</b>
                    <span>{tBlog(latestPost.monthKey)}</span>
                    <span>{latestPost.year}</span>
                  </div>
                  <h3 className="entry-title">
                    <Link to={`/blog/post/${latestPost.id}`} title={latestPost.title}>
                      {latestPost.title}
                    </Link>
                  </h3>
                </div>
                <div className="entry-content">
                  <p>{getExcerpt(latestPost.content)}</p>
                  <ContentBlockLink to="/blog" title={t("latestBlog.visitBlog")}>
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
