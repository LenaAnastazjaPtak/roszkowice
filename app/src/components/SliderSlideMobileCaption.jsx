import { Link } from "react-router-dom";

function SliderSlideMobileCaption({ pretitle, tagline, ctaLabel, ctaTitle }) {
  return (
    <div className="slider-mobile-caption">
      <p className="slider-mobile-caption__pretitle">{pretitle}</p>
      {tagline ? <p className="slider-mobile-caption__tagline">{tagline}</p> : null}
      <div className="slider-mobile-caption__cta slide-btn">
        <Link to="/about" title={ctaTitle}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export default SliderSlideMobileCaption;
