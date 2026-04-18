import HistoryFramedImage from "./HistoryFramedImage";
import HistoryParagraphList from "./HistoryParagraphList";

function HistoryPostcardsSection({ paragraphs, imageSrc, imageAlt }) {
  return (
    <div className="container-fluid no-padding onview-section onview-section--compact history-postcards-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12 img-block">
            <HistoryFramedImage variant="accent" src={imageSrc} alt={imageAlt} />
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12 onview-content">
            <HistoryParagraphList paragraphs={paragraphs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPostcardsSection;
