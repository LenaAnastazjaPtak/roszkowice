import { Link } from 'react-router-dom'

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

const comments = [
  { img: '/images/comment1.jpg', author: 'SHANE WILSON', date: 'Jan 27,2016' },
  { img: '/images/comment2.jpg', author: 'mark luiz', date: '7 lut 2016' },
  { img: '/images/comment3.jpg', author: 'DE MARIA', date: '12 mar 2016' }
]

const commentText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

function BlogSinglePage() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h3>Blog</h3>
        </div>
      </div>
      <div className="section-padding"></div>
      <div className="container-fluid no-padding blog-single">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7 col-xs-7 content-area">
              <article className="type-post">
                <div className="entry-cover"><Link to="#"><img src="/images/blog1.jpg" alt="Blog" /></Link></div>
                <div className="entry-header">
                  <div className="post-date">
                    <b>05</b>
                    <span>kwiecień</span>
                    <span>2016</span>
                  </div>
                  <h3 className="entry-title"><Link to="#" title="Lorem ipsum dolor sit amet">Lorem ipsum dolor sit amet</Link></h3>
                  <div className="entry-meta">
                    <div className="byline"><Link to="#" title="Tomasz Antoni">Tomasz Antoni</Link></div>
                    <div className="post-comment"><Link to="#"><i className="fa fa-commenting-o"></i>17 komentarzy</Link></div>
                  </div>
                </div>
                <div className="entry-content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <blockquote>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                  </blockquote>
                  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  <div className="social">
                    <h3>Udostępnij</h3>
                    <ul>
                      <li><a href="https://www.facebook.com/p/Pa%C5%82ac-Roszkowice-100084550065108/?locale=pl_PL" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
              </article>
              <div className="comment-section">
                <h3>Komentarze<span>(3)</span></h3>
                <ul className="media-list">
                  {comments.map((c, index) => (
                    <li key={index} className="media">
                      <div className="media-left"><Link to="#" title={c.author}><img src={c.img} alt="Komentarz" /></Link></div>
                      <div className="media-body">
                        <div className="media-content">
                          <h4 className="media-heading"><b>{c.author}</b> <span>{c.date}</span><Link to="#" title="Odpowiedz"><i className="fa fa-reply-all"></i>Odpowiedz</Link></h4>
                          <p>{commentText}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="comment-form">
                <h3>Dodaj komentarz</h3>
                <form className="row">
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder="Imię *" className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder="Adres e-mail *" className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder="Numer telefonu" className="form-control" />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="text" required placeholder="Temat" className="form-control" />
                  </div>
                  <div className="form-group col-md-12">
                    <textarea placeholder="Wiadomość" rows={8} className="form-control"></textarea>
                  </div>
                  <div className="col-md-12">
                    <input type="submit" title="Wyślij" value="Wyślij wiadomość" name="submit" />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-sm-5 col-xs-5 widget-area">
              <aside className="widget widget_search">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Szukaj..." />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
                  </span>
                </div>
              </aside>
              <aside className="widget widget_categories">
                <h3 className="widget-title">Kategorie</h3>
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.title}><Link to="#" title={cat.title}><span>{cat.count}</span>{cat.title}</Link></li>
                  ))}
                </ul>
              </aside>
              <aside className="widget widget_latestpost">
                <h3 className="widget-title">Ostatnie wpisy</h3>
                {latestPosts.map((item, index) => (
                  <div key={index} className="latestpost-content">
                    <Link to="#" title="Okładka wpisu"><img src={item.img} alt="Wpis" /></Link>
                    <h3><Link to="#" title={item.title}>{item.title}</Link></h3>
                    <span>{item.date}</span>
                  </div>
                ))}
              </aside>
              <aside className="widget widget_tag">
                <h3 className="widget-title">Popularne tagi</h3>
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

export default BlogSinglePage
