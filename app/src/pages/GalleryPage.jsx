import { useTranslation } from 'react-i18next'
import GallerySection from '../components/GallerySection'
import PageBanner from '../components/PageBanner'

function GalleryPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <PageBanner title={t('nav.gallery')} image="/images/roszkowice/zewn/kopula.jpg" />
      <GallerySection standalone />
      <div className="section-padding"></div>
    </>
  )
}

export default GalleryPage
