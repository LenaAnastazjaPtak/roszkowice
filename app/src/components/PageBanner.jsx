function PageBanner({ title, image, showTitle = true }) {
  return (
    <div
      className="container-fluid no-padding page-banner page-banner--image"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="page-banner__overlay" />
      <div className="container">
        {showTitle ? <h1 className="page-banner__title">{title}</h1> : null}
      </div>
    </div>
  )
}

export default PageBanner
