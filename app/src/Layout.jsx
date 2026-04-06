import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

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
      <ScrollRestoration />
      <div id="site-loader" className="load-complete">
        <div className="loader">
          <div className="loader-inner ball-clip-rotate">
            <div></div>
          </div>
        </div>
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Layout
