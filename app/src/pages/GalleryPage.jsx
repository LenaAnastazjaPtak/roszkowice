import { useTranslation } from 'react-i18next'
import GallerySection from '../components/GallerySection'

function GalleryPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <div className="container-fluid no-padding page-banner">
        <div className="container">
          <h3>{t('nav.gallery')}</h3>
        </div>
      </div>
      <GallerySection standalone />
      <div className="section-padding"></div>
    </>
  )
}

export default GalleryPage
