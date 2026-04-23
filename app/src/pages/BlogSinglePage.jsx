import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import LatestPostsWidget from "../components/LatestPostsWidget";
import PageBanner from "../components/PageBanner";
import BlogPost from "../components/BlogPost";

function BlogSinglePage() {
  const { t } = useTranslation("blog");
  const { posts, loading, getLatestPosts } = useBlogPosts();
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);
  const latestPosts = useMemo(() => getLatestPosts(3), [getLatestPosts]);

  if (loading) return null;
  if (!post) return <Navigate to="/404" replace />;

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/park/park.jpg"
      />
      <div className="section-padding"></div>
      <div className="container-fluid no-padding blog-single">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7 col-xs-7 content-area">
              <BlogPost post={post} variant="single" />
            </div>
            <div className="col-md-3 col-sm-5 col-xs-5 widget-area">
              <aside className="widget widget_back_to_posts">
                <Link
                  to="/blog"
                  className="back-to-posts-btn"
                  title={t("backToAllPosts")}
                >
                  {t("backToAllPosts")}
                </Link>
              </aside>
              <LatestPostsWidget posts={latestPosts} />
            </div>
          </div>
        </div>
      </div>
      <div className="section-padding"></div>
    </>
  );
}

export default BlogSinglePage;
