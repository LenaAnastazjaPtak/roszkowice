import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const posts = [
  { img: '/images/blog1.jpg', day: '05', monthKey: 'months.april', year: '2016', title: 'Lorem ipsum dolor sit amet', author: 'Tomasz Antoni', comments: 17 },
  { img: '/images/blog2.jpg', day: '24', monthKey: 'months.march', year: '2016', title: 'Consectetur adipiscing elit', author: 'Tomasz Antoni', comments: 6 },
  { img: '/images/blog3.jpg', day: '09', monthKey: 'months.may', year: '2016', title: 'Sed do eiusmod tempor', author: 'Tomasz Antoni', comments: 13 },
  { img: '/images/blog4.jpg', day: '20', monthKey: 'months.june', year: '2016', title: 'Ut enim ad minim veniam', author: 'Tomasz Antoni', comments: 26 }
]

const excerpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'

const categories = [
  { title: 'Muzeum', count: '09' },
  { title: 'Galeria starożytności', count: '10' },
  { title: 'Sztuki walki', count: '07' },
  { title: 'Epoka kamienia', count: '11' },
  { title: 'Portfolio sztuki', count: '13' },
  { title: 'Historia posągów', count: '07' }
]

const latestPosts = [
  { img: '/images/latest-post1.jpg', title: 'Lorem ipsum dolor sit amet', date: '09 lip 2015' },
  { img: '/images/latest-post2.jpg', title: 'Consectetur adipiscing elit', date: '09 lip 2015' },
  { img: '/images/latest-post3.jpg', title: 'Sed do eiusmod tempor', date: '09 lip 2015' }
]

const tags = ['Niesamowite', 'Posągi', 'Motywy', 'Czyste', 'Responsywność', 'sztuka', 'nowoczesne', 'ios', 'płaskie', 'Design']

function BlogPage() {
  const { t } = useTranslation('blog')

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h3>{t('title')}</h3>
        </div>
      </div>
      <div className="section-padding"></div>
      <div className="container-fluid no-padding blog-listing">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7 col-xs-7 content-area">
              {posts.map((post, index) => (
                <article key={index} className="type-post">
                  <div className="entry-cover"><Link to="#"><img src={post.img} alt="Blog" /></Link></div>
                  <div className="entry-header">
                    <div className="post-date">
                      <b>{post.day}</b>
                      <span>{t(post.monthKey)}</span>
                      <span>{post.year}</span>
                    </div>
                    <h3 className="entry-title"><Link to="#" title={post.title}>{post.title}</Link></h3>
                    <div className="entry-meta">
                      <div className="byline"><Link to="#" title={post.author}>{post.author}</Link></div>
                      <div className="post-comment"><Link to="#"><i className="fa fa-commenting-o"></i>{t('comments', { count: post.comments })}</Link></div>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{excerpt}</p>
                    <Link to="#" title={t('readMore')}>{t('readMore')}</Link>
                  </div>
                </article>
              ))}
              <nav className="ow-pagination text-center">
                <ul className="pagination">
                  <li><Link to="#"><i className="fa fa-angle-double-left"></i></Link></li>
                  <li><Link to="#">1</Link></li>
                  <li><Link to="#">2</Link></li>
                  <li><Link to="#">3</Link></li>
                  <li><Link to="#"><i className="fa fa-angle-double-right"></i></Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-3 col-sm-5 col-xs-5 widget-area">
              <aside className="widget widget_search">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder={t('searchPlaceholder')} />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
                  </span>
                </div>
              </aside>
              <aside className="widget widget_categories">
                <h3 className="widget-title">{t('categories')}</h3>
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.title}><Link to="#" title={cat.title}><span>{cat.count}</span>{cat.title}</Link></li>
                  ))}
                </ul>
              </aside>
              <aside className="widget widget_latestpost">
                <h3 className="widget-title">{t('latestPosts')}</h3>
                {latestPosts.map((item, index) => (
                  <div key={index} className="latestpost-content">
                    <Link to="#" title={t('coverTitle')}><img src={item.img} alt={t('postAlt')} /></Link>
                    <h3><Link to="#" title={item.title}>{item.title}</Link></h3>
                    <span>{item.date}</span>
                  </div>
                ))}
              </aside>
              <aside className="widget widget_tag">
                <h3 className="widget-title">{t('popularTags')}</h3>
                <div className="tags">
                  {tags.map((tag) => (
                    <Link key={tag} to="#" title={tag}>{tag}</Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div className="section-padding"></div>
    </>
  )
}

export default BlogPage
