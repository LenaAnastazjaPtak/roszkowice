import { useTranslation } from 'react-i18next'

const galleryItems = [
  { src: '/images/roszkowice/gallery/474122627_593199166841747_6658887505205181737_n.jpg', classes: 'col-md-6 col-sm-6 modern statue' },
  { src: '/images/roszkowice/gallery/474162930_593207903507540_3237014207776020479_n.jpg', classes: 'col-md-3 col-sm-3 vintage' },
  { src: '/images/roszkowice/gallery/474204322_593207626840901_4591217624674053052_n.jpg', classes: 'col-md-3 col-sm-3 statue others' },
  { src: '/images/roszkowice/gallery/474447454_593207950174202_2676854654486144187_n.jpg', classes: 'col-md-3 col-sm-3 others' },
  { src: '/images/roszkowice/gallery/474558152_593207893507541_8166201314338965762_n.jpg', classes: 'col-md-3 col-sm-3 modern' },
  { src: '/images/roszkowice/gallery/474641782_593199050175092_2384128519064534491_n.jpg', classes: 'col-md-6 col-sm-6 vintage modern' }
]

const filters = [
  { filter: '*', labelKey: 'gallery.all', active: true },
  { filter: '.modern', labelKey: 'gallery.modern', active: false },
  { filter: '.vintage', labelKey: 'gallery.vintage', active: false },
  { filter: '.statue', labelKey: 'gallery.statues', active: false },
  { filter: '.others', labelKey: 'gallery.other', active: false }
]

function GallerySection() {
  const { t } = useTranslation('home')

  return (
    <div className="container-fluid no-padding portfolio-section">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="section-header">
              <div className="section-title-border">
                <span>{t('gallery.subtitle')}</span>
                <h2>{t('gallery.title')}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-7 portfolio-categories">
            <ul id="filters">
              {filters.map(({ filter, labelKey, active }) => (
                <li key={filter}>
                  <a data-filter={filter} className={active ? 'active' : ''} href="#">{t(labelKey)}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="portfolio-list">
        {galleryItems.map((item) => (
          <div key={item.src} className={`portfolio-box no-padding ${item.classes}`}>
            <a href={item.src}>
              <img src={item.src} alt="Roszkowice" />
              <div className="portfolio-content">
                <i className="icon icon-Search"></i>
                <h3>{t('gallery.palace')}</h3>
                <span>{t('gallery.galleryLabel')}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GallerySection
