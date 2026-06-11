import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import LatestPostsWidget from "../components/LatestPostsWidget";
import PageSeo from "../components/PageSeo";
import PageBanner from "../components/PageBanner";
import BlogPost from "../components/BlogPost";
import LoadingSpinner from "../components/LoadingSpinner";
import { buildSeoDescription } from "../shared/seoDescription";

function BlogSinglePage() {
  const { t } = useTranslation("blog");
  const { posts, loading, getLatestPosts } = useBlogPosts();
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);
  const latestPosts = useMemo(() => getLatestPosts(3), [getLatestPosts]);

  if (!loading && !post) return <Navigate to="/404" replace />;

  const seoDescription = post ? buildSeoDescription(post.content) : undefined;

  return (
    <>
      <PageSeo
        pageKey="blog"
        title={post?.title}
        description={seoDescription}
        image={post?.image ?? undefined}
        path={post ? `/blog/post/${post.id}` : undefined}
        type="article"
        blogPost={post}
      />
      <PageBanner
        title={post?.title ?? t("title")}
        image="/images/roszkowice/park/park.jpg"
        bannerClassName={post ? "page-banner--post" : undefined}
        titleClassName={post ? "page-banner__title--post" : undefined}
      />
      <div className="section-padding"></div>
      {loading ? (
        <div className="container-fluid no-padding blog-single">
          <div className="container">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
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
      )}
      <div className="section-padding"></div>
    </>
  );
}

export default BlogSinglePage;
