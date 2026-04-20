function getVideoId(url) {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&]|$)/);
  return match ? match[1] : null;
}

function YouTubeEmbed({ url, className }) {
  const videoId = getVideoId(url);
  if (!videoId) return null;

  const rootClass = className
    ? `container-fluid youtube-embed ${className}`.trim()
    : "container-fluid youtube-embed";

  return (
    <div className={rootClass}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="youtube-embed__ratio">
              <iframe
                title="YouTube"
                className="youtube-embed__iframe"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubeEmbed;
