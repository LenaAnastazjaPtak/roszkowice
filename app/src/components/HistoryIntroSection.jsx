import HistoryFramedImage from "./HistoryFramedImage";

function HistoryIntroSection({ sectionLabel, heading, welcomeText, imageSrc, imageAlt }) {
  return (
    <div className="container-fluid no-padding welcome-section2">
      <div className="container">
        <div className="row" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <div className="col-md-6 col-sm-6 content-block">
            <div className="section-header2">
              <span>{sectionLabel}</span>
              <h2>{heading}</h2>
            </div>
            <p>{welcomeText}</p>
          </div>
          <div className="col-md-6 col-sm-6 img-block">
            <HistoryFramedImage variant="muted" src={imageSrc} alt={imageAlt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryIntroSection;
