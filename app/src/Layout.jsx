import { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Layout() {
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById('site-loader')
      if (loader && window.$) {
        window.$('#site-loader').fadeOut('slow')
      } else if (loader) {
        loader.style.transition = 'opacity 0.5s'
        loader.style.opacity = '0'
        setTimeout(() => { loader.style.display = 'none' }, 500)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="main-container">
      <div id="site-loader" className="load-complete">
        <div className="loader">
          <div className="loader-inner ball-clip-rotate">
            <div></div>
          </div>
        </div>
      </div>
      <header id="header" className="header-section container-fluid no-padding">
        <div className="top-header container-fluid no-padding">
          <div className="col-md-7 col-sm-12 col-xs-12 top-content no-padding">
            <a href="tel:1800234567890"><i className="fa fa-phone"></i><b>456 482 099</b></a>
            <div className="top-icons">
              <ul>
                <li><a href="https://www.facebook.com/p/Pa%C5%82ac-Roszkowice-100084550065108/?locale=pl_PL" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#" title="Google+"><i className="fa fa-google-plus"></i></a></li>
              </ul>
              <div className="lang-toggle">
                <button type="button" className={`lang-option${i18n.language === 'pl' ? ' active' : ''}`} onClick={() => i18n.changeLanguage('pl')} aria-label="Polski">PL</button>
                <span className="lang-separator">|</span>
                <button type="button" className={`lang-option${i18n.language === 'en' ? ' active' : ''}`} onClick={() => i18n.changeLanguage('en')} aria-label="English">EN</button>
                <span className="lang-separator">|</span>
                <button type="button" className={`lang-option${i18n.language === 'de' ? ' active' : ''}`} onClick={() => i18n.changeLanguage('de')} aria-label="Deutsch">DE</button>
              </div>
              <h5>{t('hours')}</h5>
            </div>
          </div>
        </div>
        <div className="container">
          <nav className="navbar navbar-default ow-navigation">
            <div className="navbar-header">
              <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                <span className="sr-only">{t('nav.toggle')}</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand"><img src="/images/roszkowice/logo.jpg" alt="Logo" style={{ maxWidth: '100px', height: '100px', objectFit: 'contain' }} /></Link>
            </div>
            <div className="menu-icon">
              <div className="search">
                <a href="#" id="search" title={t('search.title')}><i className="icon icon-Search"></i></a>
              </div>
            </div>
            <div className="navbar-collapse collapse navbar-right" id="navbar">
              <ul className="nav navbar-nav">
                <li className="active dropdown">
                  <Link to="/" title={t('nav.home')} className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">{t('nav.home')}</Link>
                  <i className="ddl-switch fa fa-angle-down"></i>
                  <ul className="dropdown-menu">
                    <li><Link to="/" title={t('nav.home1')}>{t('nav.home1')}</Link></li>
                    <li><a href="#" title={t('nav.home2')}>{t('nav.home2')}</a></li>
                  </ul>
                </li>
                <li><a href="#" title={t('nav.about')}>{t('nav.about')}</a></li>
                <li className="dropdown">
                  <a href="#" title={t('nav.events')} className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">{t('nav.events')}</a>
                  <i className="ddl-switch fa fa-angle-down"></i>
                  <ul className="dropdown-menu">
                    <li><a href="#" title={t('nav.event')}>{t('nav.event')}</a></li>
                  </ul>
                </li>
                <li><a href="#" title={t('nav.gallery')}>{t('nav.gallery')}</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" title={t('nav.pages')}>{t('nav.pages')}</a>
                  <i className="ddl-switch fa fa-angle-down"></i>
                  <ul className="dropdown-menu">
                    <li><Link to="/blog" title={t('nav.blog')}>{t('nav.blog')}</Link></li>
                    <li><Link to="/blog/post" title={t('nav.blogPost')}>{t('nav.blogPost')}</Link></li>
                    <li><a href="#" title="404">404</a></li>
                  </ul>
                </li>
                <li><a href="#" title={t('nav.contact')}>{t('nav.contact')}</a></li>
              </ul>
            </div>
            <div className="search-box">
              <span><i className="icon_close"></i></span>
              <form><input type="text" className="form-control" placeholder={t('search.placeholder')} /></form>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer-main container-fluid no-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-6">
              <aside className="ftr-widget widget_about">
                <Link to="/" title="Logo" className="navbar-brand"><img src="/images/logo-1.png" alt="logo" style={{ maxWidth: '100px', height: '100px', objectFit: 'contain' }} /></Link>
                <p>{t('footer.about')}</p>
                <ul>
                  <li><a href="https://www.facebook.com/p/Pa%C5%82ac-Roszkowice-100084550065108/?locale=pl_PL" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#" title="Google"><i className="fa fa-google-plus"></i></a></li>
                  <li><a href="#" title="Instagram"><i className="fa fa-instagram"></i></a></li>
                  <li><a href="#" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                </ul>
              </aside>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6">
              <aside className="ftr-widget widget_link">
                <h3 className="widget-title">{t('footer.info')}</h3>
                <ul>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.aboutLink')}>{t('footer.aboutLink')}</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.onExhibition')}>{t('footer.onExhibition')}</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.history')}>{t('footer.history')}</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.gallery')}>{t('footer.gallery')}</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.services')}>{t('footer.services')}</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.contact')}>{t('footer.contact')}</a></li>
                </ul>
              </aside>
            </div>
            <div className="col-md-2 col-sm-6 col-xs-6">
              <aside className="ftr-widget widget_link">
                <h3 className="widget-title">{t('footer.resources')}</h3>
                <ul>
                  <li><a href="#" title={t('footer.terms')}>{t('footer.terms')}</a></li>
                  <li><a href="#" title={t('footer.privacy')}>{t('footer.privacy')}</a></li>
                  <li><a href="#" title={t('footer.sitemap')}>{t('footer.sitemap')}</a></li>
                </ul>
              </aside>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6">
              <aside className="ftr-widget widget_subscribe">
                <h3 className="widget-title">{t('footer.newsletter')}</h3>
                <input type="text" className="form-control" placeholder={t('footer.emailPlaceholder')} />
                <button type="button" title={t('footer.subscribe')} className="btn btn-default">{t('footer.subscribe')}</button>
              </aside>
            </div>
          </div>
        </div>
        <div className="container-fluid no-padding copyright">
          <p>{t('footer.copyright')} <i className="fa fa-copyright"></i> 2016</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
