import HistoryParagraphList from "./HistoryParagraphList";

function HistoryPostcardsSection({ paragraphs, imageSrc, imageAlt }) {
  return (
    <div className="container-fluid no-padding onview-section onview-section--compact">
      <div className="container" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <div className="col-md-5 col-sm-5 col-xs-12 img-block">
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7 col-sm-7 col-xs-12 onview-content">
          <HistoryParagraphList paragraphs={paragraphs} />
        </div>
      </div>
    </div>
  );
}

export default HistoryPostcardsSection;
