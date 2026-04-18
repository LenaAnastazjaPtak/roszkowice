function HistoryFramedImage({ variant, src, alt, className }) {
  const rootClass = `history-framed-image history-framed-image--${variant}`;
  return (
    <div className={className ? `${rootClass} ${className}`.trim() : rootClass}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default HistoryFramedImage;
