import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  posts,
  getLatestPosts,
  getTagsFromPosts,
} from "../data/blogPosts";
import LatestPostsWidget from "../components/LatestPostsWidget";
import PopularTagsWidget from "../components/PopularTagsWidget";
import PageBanner from "../components/PageBanner";
import BlogPost from "../components/BlogPost";

// const categories = [
//   { title: 'Muzeum', count: '09' },
//   { title: 'Galeria starożytności', count: '10' },
//   { title: 'Sztuki walki', count: '07' },
//   { title: 'Epoka kamienia', count: '11' },
//   { title: 'Portfolio sztuki', count: '13' },
//   { title: 'Historia posągów', count: '07' }
// ]

// const comments = [
//   { img: '/images/comment1.jpg', author: 'SHANE WILSON', date: 'Jan 27,2016' },
//   { img: '/images/comment2.jpg', author: 'mark luiz', date: '7 lut 2016' },
//   { img: '/images/comment3.jpg', author: 'DE MARIA', date: '12 mar 2016' }
// ]
//
// const commentText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

function BlogSinglePage() {
  const { t } = useTranslation("blog");
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);
  if (!post) return <Navigate to="/404" replace />;

  return (
    <>
      <PageBanner
        title={t("title")}
        image="/images/roszkowice/slider/palac_dawniej.jpg"
      />
      <div className="section-padding"></div>
      <div className="container-fluid no-padding blog-single">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7 col-xs-7 content-area">
              <BlogPost post={post} variant="single" />
              {/* <div className="comment-section">
                <h3>{t('commentsSection')}<span>(3)</span></h3>
                <ul className="media-list">
                  {comments.map((c, index) => (
                    <li key={index} className="media">
                      <div className="media-left"><Link to="#" title={c.author}><img src={c.img} alt={t('commentAlt')} /></Link></div>
                      <div className="media-body">
                        <div className="media-content">
                          <h4 className="media-heading"><b>{c.author}</b> <span>{c.date}</span><Link to="#" title={t('reply')}><i className="fa fa-reply-all"></i>{t('reply')}</Link></h4>
                          <p>{commentText}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="comment-form">
                <h3>{t('addComment')}</h3>
                <form className="row">
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder={t('namePlaceholder')} className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder={t('emailPlaceholder')} className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder={t('phonePlaceholder')} className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder={t('subjectPlaceholder')} className="form-control" />
                  </div>
                  <div className="form-group col-md-12">
                    <textarea placeholder={t('messagePlaceholder')} rows={8} className="form-control"></textarea>
                  </div>
                  <div className="col-md-12">
                    <input type="submit" title="Wyślij" value={t('submit')} name="submit" />
                  </div>
                </form>
              </div> */}
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

export default BlogSinglePage;
