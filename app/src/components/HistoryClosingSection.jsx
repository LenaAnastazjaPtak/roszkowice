import ContentBlockLink from "./ContentBlockLink";
import HistoryFramedImage from "./HistoryFramedImage";
import HistoryParagraphList from "./HistoryParagraphList";

function HistoryClosingSection({ paragraphs, seeBlogTitle, imageSrc, imageAlt }) {
  return (
    <div className="container-fluid no-padding welcome-section2">
      <div className="container">
        <div className="row" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <div className="col-md-6 col-sm-6 content-block">
            <HistoryParagraphList paragraphs={paragraphs} />
            <ContentBlockLink to="/blog" title={seeBlogTitle}>
              {seeBlogTitle}
            </ContentBlockLink>
          </div>
          <div className="col-md-6 col-sm-6 img-block">
            <HistoryFramedImage variant="muted" src={imageSrc} alt={imageAlt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryClosingSection;
