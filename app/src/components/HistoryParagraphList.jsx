function HistoryParagraphList({ paragraphs }) {
  return paragraphs.map((text, i) => <p key={i}>{text}</p>);
}

export default HistoryParagraphList;
