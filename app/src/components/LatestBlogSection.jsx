import { useTranslation } from "react-i18next";

const blogPosts = [
  {
    img: "/images/latest-blog1.jpg",
    day: "05",
    monthKey: "latestBlog.monthApril",
    year: "2016",
    title: "Lorem ipsum dolor sit amet",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Thomas Antony",
    comments: 17,
  },
];

function LatestBlogSection() {
  const { t } = useTranslation("home");

  return (
    <div className="container-fluid no-padding latest-blog">
      <div className="section-padding"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
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
          </div>
          <div className="blog-carousel col-md-12 no-padding">
            {blogPosts.map((post, index) => (
              <article key={index} className="type-post">
                <div className="col-md-6">
                  <div className="entry-cover">
                    <a href={`/blog/post/${index}`}>
                      <img src={post.img} alt="Blog" />
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="entry-header">
                    <div className="post-date">
                      <b>{post.day}</b>
                      <span>{t(post.monthKey)}</span>
                      <span>{post.year}</span>
                    </div>
                    <h3 className="entry-title">
                      <a href={`/blog/post/${index}`} title={post.title}>
                        {post.title}
                      </a>
                    </h3>
                  </div>
                  <div className="entry-content">
                    <p>{post.excerpt}</p>
                    {/* <div className="entry-meta">
                      <div className="byline">
                        <a href="#" title={post.author}>
                          {post.author}
                        </a>
                      </div>
                      <div className="post-comment">
                        <a href={`/blog/post/${index}`}>
                          <i className="fa fa-commenting-o"></i>
                          {t("latestBlog.comments", { count: post.comments })}
                        </a>
                      </div>
                    </div> */}
                    {/* <a href="#" title={t('latestBlog.readMore')}>{t('latestBlog.readMore')}</a> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="section-padding"></div>
    </div>
  );
}

export default LatestBlogSection;
