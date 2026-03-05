import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="footer-main container-fluid no-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-6">
            <aside className="ftr-widget widget_about">
              <Link to="/" title="Logo" className="navbar-brand"><img src="/images/logo-1.png" alt="logo" style={{ maxWidth: '100px', height: '100px', objectFit: 'contain' }} /></Link>
              <p>{t('footer.about')}</p>
              <ul>
                <li><a href="https://www.facebook.com/p/Pa%C5%82ac-Roszkowice-100084550065108/?locale=pl_PL" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://www.instagram.com/palac_roszkowice/ " title="Instagram" target="_blank"><i className="fa fa-instagram"></i></a></li>
              </ul>
            </aside>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6">
            <aside className="ftr-widget widget_link">
              <h3 className="widget-title">{t('footer.info')}</h3>
              <ul>
                <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.aboutLink')}>{t('footer.aboutLink')}</a></li>
                <li className="col-md-6 col-sm-6 col-xs-6"><a href="/gallery" title={t('footer.gallery')}>{t('footer.gallery')}</a></li>
                <li className="col-md-6 col-sm-6 col-xs-6"><a href="#" title={t('footer.camera')}>{t('footer.camera')}</a></li>
                <li className="col-md-6 col-sm-6 col-xs-6"><Link to="/contact" title={t('footer.contact')}>{t('footer.contact')}</Link></li>
              </ul>
            </aside>
          </div>
          <div className="col-md-2 col-sm-6 col-xs-6">
            <aside className="ftr-widget widget_link">
              <h3 className="widget-title">{t('footer.resources')}</h3>
              <ul>
                <li><Link to="/terms" title={t('footer.terms')}>{t('footer.terms')}</Link></li>
                <li><Link to="/privacy-policy" title={t('footer.privacy')}>{t('footer.privacy')}</Link></li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
      <div className="container-fluid no-padding copyright">
        <p>{t('footer.copyright')} <i className="fa fa-copyright"></i> 2026</p>
      </div>
    </footer>
  )
}

export default Footer
