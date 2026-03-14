import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";

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
          {/* <div className="col-md-4">
            <div className="section-header">
              <div className="section-title-border">
                <span>{t("latestBlog.subtitle")}</span>
                <h2>{t("latestBlog.title")}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div> 
          <div className="col-md-2">
            <div className="wc-controls">
              <a href="javascript:void(0)" className="left">
                <span></span>
              </a>
              <a href="javascript:void(0)" className="right">
                <span></span>
              </a>
            </div>
          </div> */}
          <div className="blog-carousel col-md-12 no-padding">
            <article className="type-post">
              <div className="col-md-4 latest-blog__thumb-col">
                <div className="entry-cover entry-cover--square">
                  <Link to={`/blog/post/${latestPost.id}`}>
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
                  <a href="/blog" title={t("latestBlog.visitBlog")}>
                    {t("latestBlog.visitBlog")}
                  </a>
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
