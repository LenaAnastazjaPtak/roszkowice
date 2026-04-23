import { useState, useMemo } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import LatestPostsWidget from "../components/LatestPostsWidget";
import BlogSearchWidget from "../components/BlogSearchWidget";
import PageBanner from "../components/PageBanner";
import BlogPost from "../components/BlogPost";

const POSTS_PER_PAGE = 3;

function filterPostsByPhrase(postsList, phrase) {
  const normalized = phrase.trim().toLowerCase();
  if (!normalized) return postsList;
  return postsList.filter(
    (post) =>
      post.title.toLowerCase().includes(normalized) ||
      post.content.toLowerCase().includes(normalized),
  );
}

function BlogPage() {
  const { t } = useTranslation("blog");
  const { posts, loading, getLatestPosts } = useBlogPosts();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchPhrase, setSearchPhrase] = useState("");

  const filteredPosts = filterPostsByPhrase(posts, searchPhrase);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const pageFromUrl = parseInt(searchParams.get("page"), 10);
  const currentPage = Math.min(
    Math.max(1, isNaN(pageFromUrl) ? 1 : pageFromUrl),
    totalPages,
  );
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleSearchChange = (e) => {
    setSearchPhrase(e.target.value);
  };

  const pageUrl = (pageNum) => {
    const next = new URLSearchParams(searchParams);
    if (pageNum <= 1) next.delete("page");
    else next.set("page", String(pageNum));
    const search = next.toString();
    return { pathname: location.pathname, search: search ? `?${search}` : "" };
  };

  const latestPosts = useMemo(() => getLatestPosts(3), [getLatestPosts]);

  if (loading) return null;

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/park/park.jpg"
      />
      <div className="section-padding"></div>
      <div className="container-fluid no-padding blog-listing">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7 col-xs-7 content-area">
              {filteredPosts.length === 0 ? (
                <p className="blog-no-results">{t("noPostsFound")}</p>
              ) : (
                <>
                  {visiblePosts.map((post) => (
                    <BlogPost key={post.id} post={post} variant="listing" />
                  ))}
                  {totalPages > 1 && (
                    <nav className="ow-pagination text-center">
                      <ul className="pagination">
                        <li className={currentPage === 1 ? "disabled" : ""}>
                          <Link to={pageUrl(1)}>
                            <i className="fa fa-angle-double-left"></i>
                          </Link>
                        </li>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <li
                            key={page}
                            className={currentPage === page ? "active" : ""}
                          >
                            <Link to={pageUrl(page)}>{page}</Link>
                          </li>
                        ))}
                        <li
                          className={
                            currentPage === totalPages ? "disabled" : ""
                          }
                        >
                          <Link to={pageUrl(totalPages)}>
                            <i className="fa fa-angle-double-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
            <div className="col-md-3 col-sm-5 col-xs-5 widget-area">
              <BlogSearchWidget
                value={searchPhrase}
                onChange={handleSearchChange}
              />
              <LatestPostsWidget posts={latestPosts} />
            </div>
          </div>
        </div>
      </div>
      <div className="section-padding"></div>
    </>
  );
}

export default BlogPage;
