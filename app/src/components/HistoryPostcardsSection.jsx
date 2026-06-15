import HistoryFramedImage from "./HistoryFramedImage";
import HistoryParagraphList from "./HistoryParagraphList";
import ScrollRevealImage from "./ScrollRevealImage";

function HistoryPostcardsSection({ paragraphs, imageSrc, imageAlt }) {
  return (
    <div className="container-fluid no-padding onview-section onview-section--compact history-postcards-section">
      <div className="container">
        <div className="row">
          <ScrollRevealImage className="col-md-6 col-sm-6 col-xs-12 img-block">
            <HistoryFramedImage variant="accent" src={imageSrc} alt={imageAlt} />
          </ScrollRevealImage>
          <div className="col-md-6 col-sm-6 col-xs-12 onview-content">
            <HistoryParagraphList paragraphs={paragraphs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPostcardsSection;
