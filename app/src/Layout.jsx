import { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
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
                <span className="lang-option active" data-lang="pl">PL</span>
                <span className="lang-separator">|</span>
                <span className="lang-option" data-lang="en">EN</span>
              </div>
              <h5><span>GODZINY OTWARCIA:</span> PONIEDZIAŁEK - NIEDZIELA: 10:00 - 20:00</h5>
            </div>
          </div>
        </div>
        <div className="container">
          <nav className="navbar navbar-default ow-navigation">
            <div className="navbar-header">
              <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                <span className="sr-only">Przełącz nawigację</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand"><img src="/images/roszkowice/logo.jpg" alt="Logo" style={{ maxWidth: '100px', height: '100px', objectFit: 'contain' }} /></Link>
            </div>
            <div className="menu-icon">
              <div className="search">
                <a href="#" id="search" title="Szukaj"><i className="icon icon-Search"></i></a>
              </div>
            </div>
            <div className="navbar-collapse collapse navbar-right" id="navbar">
              <ul className="nav navbar-nav">
                <li className="active dropdown">
                  <Link to="/" title="Strona główna" className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">Strona główna</Link>
                  <i className="ddl-switch fa fa-angle-down"></i>
                  <ul className="dropdown-menu">
                    <li><Link to="/" title="strona główna 1">strona główna 1</Link></li>
                    <li><a href="#" title="strona główna 2">strona główna 2</a></li>
                  </ul>
                </li>
                <li><a href="#" title="O nas">O nas</a></li>
                <li className="dropdown">
                  <a href="#" title="Wydarzenia" className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">Wydarzenia</a>
                  <i className="ddl-switch fa fa-angle-down"></i>
                  <ul className="dropdown-menu">
                    <li><a href="#" title="wydarzenie">Wydarzenie</a></li>
                  </ul>
                </li>
                <li><a href="#" title="Galeria">Galeria</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" title="Strony">Strony</a>
                  <i className="ddl-switch fa fa-angle-down"></i>
                  <ul className="dropdown-menu">
                    <li><Link to="/blog" title="Blog">Blog</Link></li>
                    <li><Link to="/blog/post" title="Wpis na blogu">Wpis na blogu</Link></li>
                    <li><a href="#" title="404">404</a></li>
                  </ul>
                </li>
                <li><a href="#" title="Kontakt">Kontakt</a></li>
              </ul>
            </div>
            <div className="search-box">
              <span><i className="icon_close"></i></span>
              <form><input type="text" className="form-control" placeholder="Wpisz słowo kluczowe i naciśnij Enter..." /></form>
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
                <p>Dziewiętnastowieczna rezydencja ziemiańska odzyskująca dawny blask.</p>
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
                <h3 className="widget-title">INFORMACJE</h3>
                <ul>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title="O nas">O nas</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title="Na wystawie">Na wystawie</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title="Historia">Historia</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title="Galeria">Galeria</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title="Usługi">Usługi</a></li>
                  <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title="Kontakt">Kontakt</a></li>
                </ul>
              </aside>
            </div>
            <div className="col-md-2 col-sm-6 col-xs-6">
              <aside className="ftr-widget widget_link">
                <h3 className="widget-title">Zasoby</h3>
                <ul>
                  <li><a href="#" title="Regulamin">Regulamin</a></li>
                  <li><a href="#" title="Polityka prywatności">Polityka prywatności</a></li>
                  <li><a href="#" title="Mapa strony">Mapa strony</a></li>
                </ul>
              </aside>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6">
              <aside className="ftr-widget widget_subscribe">
                <h3 className="widget-title">Newsletter</h3>
                <input type="text" className="form-control" placeholder="Twój adres e-mail" />
                <button type="button" title="Subskrybuj" className="btn btn-default">Subskrybuj</button>
              </aside>
            </div>
          </div>
        </div>
        <div className="container-fluid no-padding copyright">
          <p>wszelkie prawa zastrzeżone <i className="fa fa-copyright"></i> 2016</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
