import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const POSTS_PER_PAGE = 3

const posts = [
  {
    img: '/images/roszkowice/park/park.jpg',
    day: '19',
    monthKey: 'months.october',
    year: '2025',
    title: 'Złota jesień w parku pałacowym',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Tak pięknie jest w naszym parku jesienią! ☀️ Drzewa w Roszkowicach skąpane w ciepłym słońcu.
Prace renowacyjne trwają, a my z każdym dniem zbliżamy się do celu: ponownego otwarcia tego niezwykłego miejsca. Dziękujemy, że jesteście z nami! 🍁
#Pałac #Roszkowice #HistoryczneMiejsca #Park #ZłotaJesień`
  },
  {
    img: '/images/roszkowice/slider/zima.jpg',
    day: '24',
    monthKey: 'months.december',
    year: '2025',
    title: 'Wigilijny wieczór w Roszkowicach',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Dziś, w ten wyjątkowy Wigilijny wieczór, w Roszkowicach panuje cisza i oczekiwanie na pierwszą gwiazdkę ⭐, a my z niecierpliwością oczekujemy – gdy to miejsce znów będzie tętniło życiem, światłem i radością odwiedzających. 🕯️
Czekamy na moment, w którym będziemy mogli otworzyć Pałac dla Was! ❤️
#PałacRoszkowice #Wigilia #BożeNarodzenie #ŻyczeniaŚwiąteczne #Zabytek`
  },
  {
    img: '/images/roszkowice/zewn/pionowa_zima.jpg',
    day: '01',
    monthKey: 'months.january',
    year: '2026',
    title: 'Nowy Rok 2026 – plany i przyspieszenie renowacji',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Nowy Rok w Pałacu Roszkowice to czas wielkich zmian i przyspieszenia prac renowacyjnych. Mamy ambitne plany, dotyczące otworzenia dla Was Pałacu i parku! 🌳🔑
Możemy obiecać jedno: będzie się działo! 🛠️🔥 Nasza misja, by przywrócić pałacowi dawny blask i otworzyć go dla Was, wkracza w decydującą fazę.
Nie możemy się doczekać, aż wszystko zobaczycie na własne oczy 👀 i przejdziecie się odnowionymi salami oraz parkowymi alejami. Śledźcie nas – będziemy regularnie dzielić się postępami! 👇
#PałacRoszkowice #NowyRok2026 #PlanyNaNowyRok #Renowacja #Odbudowa #Zabytek #Wizja #Rewitalizacja`
  },
  {
    img: '/images/roszkowice/zewn/IMG-20251021-WA0011.jpg',
    day: '20',
    monthKey: 'months.january',
    year: '2026',
    title: 'Jesteśmy na Instagramie!',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Jesteśmy na Instagramie! 📸🏰
Chcesz widzieć Pałac Roszkowice w najlepszym wydaniu? Zapraszamy na nasz nowy profil, gdzie królować będą piękne zdjęcia.
Bądź na bieżąco i wspieraj naszą działalność ✨ 👇
https://www.instagram.com/palac_roszkowice/
#Pałac #Instagram #FollowUs #PolskaJestPiękna`
  }
]

const categories = [
  { title: 'Muzeum', count: '09' },
  { title: 'Galeria starożytności', count: '10' },
  { title: 'Sztuki walki', count: '07' },
  { title: 'Epoka kamienia', count: '11' },
  { title: 'Portfolio sztuki', count: '13' },
  { title: 'Historia posągów', count: '07' }
]

const latestPosts = [
  { img: '/images/roszkowice/zewn/IMG-20251021-WA0011.jpg', title: 'Jesteśmy na Instagramie!', date: '20 sty 2026' },
  { img: '/images/roszkowice/zewn/pionowa_zima.jpg', title: 'Nowy Rok 2026 – plany i przyspieszenie renowacji', date: '01 sty 2026' },
  { img: '/images/roszkowice/slider/zima.jpg', title: 'Wigilijny wieczór w Roszkowicach', date: '24 gru 2025' }
]

const tags = ['Niesamowite', 'Posągi', 'Motywy', 'Czyste', 'Responsywność', 'sztuka', 'nowoczesne', 'ios', 'płaskie', 'Design']

function BlogPage() {
  const { t } = useTranslation('blog')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const visiblePosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

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
              {visiblePosts.map((post) => (
                <article key={post.title} className="type-post">
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
