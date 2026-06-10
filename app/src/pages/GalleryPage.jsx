import { useTranslation } from 'react-i18next'
import PageSeo from '../components/PageSeo'
import GallerySection from '../components/GallerySection'
import PageBanner from '../components/PageBanner'

function GalleryPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <PageSeo
        pageKey="gallery"
        image="/images/roszkowice/zewn/kopula.jpg"
      />
      <PageBanner title={t('nav.gallery')} image="/images/roszkowice/zewn/kopula.jpg" />
      <GallerySection standalone />
    </>
  )
}

export default GalleryPage
