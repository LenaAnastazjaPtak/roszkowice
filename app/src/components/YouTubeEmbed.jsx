function getVideoId(url) {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&]|$)/)
  return match ? match[1] : null
}

function YouTubeEmbed({ url }) {
  const videoId = getVideoId(url)
  if (!videoId) return null

  return (
    <div className="container-fluid no-padding" style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%' }}>
              <iframe
                title="YouTube"
                src={`https://www.youtube.com/embed/${videoId}`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTubeEmbed
