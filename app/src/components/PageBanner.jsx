function PageBanner({ title, image }) {
  return (
    <div
      className="container-fluid no-padding page-banner page-banner--image"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="page-banner__overlay" />
      <div className="container">
        <h3>{title}</h3>
      </div>
    </div>
  )
}

export default PageBanner
