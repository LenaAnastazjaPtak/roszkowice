import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { posts, getLatestPosts, getTagsFromPosts } from '../data/blogPosts'
import LatestPostsWidget from '../components/LatestPostsWidget'
import PopularTagsWidget from '../components/PopularTagsWidget'
import BlogSearchWidget from '../components/BlogSearchWidget'
import PageBanner from '../components/PageBanner'

const POSTS_PER_PAGE = 3

// const categories = [
//   { title: 'Muzeum', count: '09' },
//   { title: 'Galeria starożytności', count: '10' },
//   { title: 'Sztuki walki', count: '07' },
//   { title: 'Epoka kamienia', count: '11' },
//   { title: 'Portfolio sztuki', count: '13' },
//   { title: 'Historia posągów', count: '07' }
// ]

function filterPostsByPhrase(postsList, phrase) {
  const normalized = phrase.trim().toLowerCase()
  if (!normalized) return postsList
  return postsList.filter(
    (post) =>
      post.title.toLowerCase().includes(normalized) ||
      post.content.toLowerCase().includes(normalized)
  )
}

function BlogPage() {
  const { t } = useTranslation('blog')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchPhrase, setSearchPhrase] = useState('')
  const filteredPosts = filterPostsByPhrase(posts, searchPhrase)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleSearchChange = (e) => {
    setSearchPhrase(e.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <PageBanner title={t('title')} image="/images/roszkowice/slider/palac_dawniej.jpg" />
      <div className="section-padding"></div>
      <div className="container-fluid no-padding blog-listing">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7 col-xs-7 content-area">
              {filteredPosts.length === 0 ? (
                <p className="blog-no-results">{t('noPostsFound')}</p>
              ) : (
                <>
              {visiblePosts.map((post) => (
                <article key={post.title} className="type-post">
                  <div className="entry-cover"><Link to={`/blog/post/${post.id}`}><img src={post.img} alt="Blog" /></Link></div>
                  <div className="entry-header">
                    <div className="post-date">
                      <b>{post.day}</b>
                      <span>{t(post.monthKey)}</span>
                      <span>{post.year}</span>
                    </div>
                    <h3 className="entry-title"><Link to={`/blog/post/${post.id}`} title={post.title}>{post.title}</Link></h3>
                    <div className="entry-meta">
                      <div className="byline"><Link to="#" title={post.author}>{post.author}</Link></div>
                      <div className="post-comment"><Link to="#"><i className="fa fa-commenting-o"></i>{t('comments', { count: post.comments })}</Link></div>
                    </div>
                  </div>
                  <div className="entry-content">
                    <div style={{ whiteSpace: 'pre-line' }}>{post.content}</div>
                  </div>
                </article>
              ))}
              {totalPages > 1 && (
                <nav className="ow-pagination text-center">
                  <ul className="pagination">
                    <li className={currentPage === 1 ? 'disabled' : ''}>
                      <Link to="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(1) }}><i className="fa fa-angle-double-left"></i></Link>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={currentPage === page ? 'active' : ''}>
                        <Link to="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page) }}>{page}</Link>
                      </li>
                    ))}
                    <li className={currentPage === totalPages ? 'disabled' : ''}>
                      <Link to="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(totalPages) }}><i className="fa fa-angle-double-right"></i></Link>
                    </li>
                  </ul>
                </nav>
              )}
                </>
              )}
            </div>
            <div className="col-md-3 col-sm-5 col-xs-5 widget-area">
              <BlogSearchWidget value={searchPhrase} onChange={handleSearchChange} />
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
  )
}

export default BlogPage
