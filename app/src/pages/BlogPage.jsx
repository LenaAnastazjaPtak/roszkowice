import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../hooks/useBlogPosts";
import LatestPostsWidget from "../components/LatestPostsWidget";
import PopularTagsWidget from "../components/PopularTagsWidget";
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
  const { posts, getLatestPosts, getTagsFromPosts, getPostsByTag } =
    useBlogPosts();
  const [searchParams] = useSearchParams();
  const tagFromUrl = searchParams.get("tag");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const basePosts = useMemo(
    () => (tagFromUrl ? getPostsByTag(tagFromUrl) : posts),
    [tagFromUrl, getPostsByTag, posts],
  );
  const filteredPosts = filterPostsByPhrase(basePosts, searchPhrase);

  useEffect(() => {
    setCurrentPage(1);
  }, [tagFromUrl]);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleSearchChange = (e) => {
    setSearchPhrase(e.target.value);
    setCurrentPage(1);
  };

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
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) setCurrentPage(1);
                            }}
                          >
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
                            <Link
                              to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                            >
                              {page}
                            </Link>
                          </li>
                        ))}
                        <li
                          className={
                            currentPage === totalPages ? "disabled" : ""
                          }
                        >
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages)
                                setCurrentPage(totalPages);
                            }}
                          >
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
              {/* <aside className="widget widget_categories">
                <h3 className="widget-title">{t('categories')}</h3>
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.title}><Link to="#" title={cat.title}><span>{cat.count}</span>{cat.title}</Link></li>
                  ))}
                </ul>
              </aside> */}
              <LatestPostsWidget posts={getLatestPosts(t)} />
              <PopularTagsWidget tags={getTagsFromPosts()} />
            </div>
          </div>
        </div>
      </div>
      <div className="section-padding"></div>
    </>
  );
}

export default BlogPage;
