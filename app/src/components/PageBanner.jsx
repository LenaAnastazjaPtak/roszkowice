function PageBanner({
  title,
  image,
  showTitle = true,
  bannerClassName,
  titleClassName,
}) {
  const bannerClasses = [
    "container-fluid",
    "no-padding",
    "page-banner",
    "page-banner--image",
    bannerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = ["page-banner__title", titleClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={bannerClasses}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="page-banner__overlay" />
      <div className="container">
        {showTitle ? <h1 className={titleClasses}>{title}</h1> : null}
      </div>
    </div>
  );
}

export default PageBanner
