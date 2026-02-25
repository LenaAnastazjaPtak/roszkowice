import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const MAP_SCRIPT_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCf0dPCQ0C7oVF0WFKhuyz7v7oWei3vFPI'

function ContactPage() {
  const { t } = useTranslation('contact')
  const [submitStatus, setSubmitStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initMap = () => {
      if (window.initContactMap) {
        window.initContactMap()
        return
      }
      const el = document.getElementById('map-canvas-contact')
      if (!el || !window.google) return
      const lat = parseFloat(el.getAttribute('data-lat'))
      const lng = parseFloat(el.getAttribute('data-lng'))
      const contentString = el.getAttribute('data-string')
      const zoom = parseInt(el.getAttribute('data-zoom'), 10)
      const myLatlng = new window.google.maps.LatLng(lat, lng)
      const styles = [
        { featureType: 'landscape', stylers: [{ saturation: -100 }, { lightness: 65 }, { visibility: 'on' }] },
        { featureType: 'poi', stylers: [{ saturation: -100 }, { lightness: 51 }, { visibility: 'simplified' }] },
        { featureType: 'road.highway', stylers: [{ saturation: -100 }, { visibility: 'simplified' }] },
        { featureType: 'road.arterial', stylers: [{ saturation: -100 }, { lightness: 30 }, { visibility: 'on' }] },
        { featureType: 'road.local', stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }] },
        { featureType: 'transit', stylers: [{ saturation: -100 }, { visibility: 'simplified' }] },
        { featureType: 'administrative.province', stylers: [{ visibility: 'off' }] },
        { featureType: 'water', elementType: 'labels', stylers: [{ visibility: 'on' }, { lightness: -25 }, { saturation: -100 }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ hue: '#ffff00' }, { lightness: -25 }, { saturation: -97 }] }
      ]
      const styledMap = new window.google.maps.StyledMapType(styles, { name: 'Styled Map' })
      const mapOptions = {
        zoom,
        disableDefaultUI: true,
        center: myLatlng,
        scrollwheel: false,
        mapTypeControlOptions: {
          mapTypeIds: [window.google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      }
      const map = new window.google.maps.Map(el, mapOptions)
      map.mapTypes.set('map_style', styledMap)
      map.setMapTypeId('map_style')
      const infowindow = new window.google.maps.InfoWindow({ content: contentString })
      const marker = new window.google.maps.Marker({
        position: myLatlng,
        map,
        icon: '/images/marker.png'
      })
      window.google.maps.event.addListener(marker, 'click', () => infowindow.open(map, marker))
    }

    if (window.google && window.google.maps) {
      initMap()
      return
    }
    const script = document.createElement('script')
    script.src = MAP_SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => setTimeout(initMap, 100)
    document.head.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)
    const form = e.target
    const data = new FormData(form)
    const body = {
      'contact-fname': data.get('contact-fname'),
      'contact-lname': data.get('contact-lname'),
      'contact-email': data.get('contact-email'),
      'contact-subject': data.get('contact-subject'),
      'contact-message': data.get('contact-message')
    }
    const empty = Object.entries(body).some(([, v]) => !String(v).trim())
    if (empty) {
      setSubmitStatus({ type: 'error', msg: t('fillAll') })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString()
      })
      const result = await res.json()
      setSubmitStatus({ type: result.type, msg: result.msg })
      if (result.type === 'success') form.reset()
    } catch {
      setSubmitStatus({ type: 'error', msg: t('error') })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container-fluid no-padding page-banner">
        <div className="container">
          <h3>{t('title')}</h3>
        </div>
      </div>
      <div className="section-padding"></div>
      <div className="container-fluid no-padding contact-section">
        <div className="container">
          <div className="contact-info">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/contact-info1.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('locationTitle')}</h3>
              <p>Roszkowice 57,</p>
              <p>46-220 Roszkowice</p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/contact-info2.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('contactTitle')}</h3>
              <p><a href="tel:+1800433633">+48 800 433 633</a></p>
              <p><a href="tel:+1800123456">+48 800 123 456</a></p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              <i><img src="/images/contact-info3.png" alt={t('contactInfoAlt')} /></i>
              <h3>{t('emailTitle')}</h3>
              <p><a href="mailto:info@palacroszkowice.pl">info@palacroszkowice.pl</a></p>
              <p><a href="mailto:support@palacroszkowice.pl">support@palacroszkowice.pl</a></p>
            </div>
          </div>
          <div className="contact-form">
            <h3>{t('formTitle')}</h3>
            <p>{t('formSubtitle')}</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <input type="text" name="contact-fname" id="input_fname" required placeholder={t('firstName')} className="form-control" />
                  <input type="text" name="contact-lname" id="input_lname" required placeholder={t('lastName')} className="form-control" />
                  <input type="email" name="contact-email" id="input_email" required placeholder={t('email')} className="form-control" />
                  <input type="text" name="contact-subject" id="input_subject" required placeholder={t('subject')} className="form-control" />
                </div>
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <textarea name="contact-message" id="textarea_message" placeholder={t('message')} rows="4" className="form-control" required></textarea>
                  <button id="btn_submit" type="submit" title={t('submit')} disabled={loading}>{t('submit')}</button>
                </div>
              </div>
              {submitStatus && (
                <div className={`alert-msg ${submitStatus.type === 'success' ? 'alert-msg-success' : 'alert-msg-failure'}`} id="alert-msg">
                  {submitStatus.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="padding-100"></div>
      <div className="container-fluid no-padding map-section">
        <div id="map-canvas-contact" className="map-canvas" data-lat="50.3419" data-lng="18.2125" data-string="Roszkowice" data-zoom="12"></div>
      </div>
    </>
  )
}

export default ContactPage
