const welcomeText = `Pałac w Roszkowicach powstał w połowie XIX wieku jako siedziba rodu von Cramon-Taubadel.
Przez dekady był centrum życia majątku — miejscem pracy, spotkań i wydarzeń rodzinnych.

Po wojnie budynek pełnił różne funkcje użytkowe, stopniowo tracąc swój reprezentacyjny charakter.
Dziś trwa jego renowacja, której celem jest zachowanie zabytku i przywrócenie historycznego wyglądu.

Zapraszamy do poznania historii miejsca, ludzi i architektury, które tworzyły ten pałac przez blisko 180 lat.`

const slides = [
  { img: '/images/roszkowice/pionowa_zima.jpg', alt: 'Pałac Roszkowice zimą', active: true },
  { img: '/images/roszkowice/pionowe.jpg', alt: 'Pałac Roszkowice', active: false }
]

function WelcomeSection() {
  return (
    <div id="welcome-section" className="container-fluid no-padding welcome-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-border">
            <span>Witamy w</span>
            <h2>Pałacu w Roszkowicach</h2>
          </div>
        </div>
        <div className="row">
          <div id="welcome-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              {slides.map((slide) => (
                <div key={slide.img} className={`item${slide.active ? ' active' : ''}`}>
                  <div className="col-md-6 col-sm-6 content-block">
                    <p>{welcomeText}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <a href="#" title="Czytaj więcej">Czytaj więcej</a>
                  </div>
                  <div className="col-md-6 col-sm-6 img-block">
                    <i><img src={slide.img} alt={slide.alt} style={{ objectFit: 'cover', width: '100%', height: '100%' }} /></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="wc-controls">
              <a className="left carousel-control" href="#welcome-carousel" role="button" data-slide="prev">
                <span></span>
              </a>
              <a className="right carousel-control" href="#welcome-carousel" role="button" data-slide="next">
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection
