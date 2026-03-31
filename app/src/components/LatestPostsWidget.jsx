import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function LatestPostsWidget({ posts }) {
  const { t } = useTranslation('blog')
  return (
    <aside className="widget widget_latestpost">
      <h3 className="widget-title">{t('latestPosts')}</h3>
      {posts.map((item) => (
        <div key={item.id} className="latestpost-content">
          <Link to={item.id !== undefined ? `/blog/post/${item.id}` : '#'} title={t('coverTitle')} className="img-hover-zoom">
            <img src={item.img} alt={t('postAlt')} />
          </Link>
          <h3>
            <Link to={item.id !== undefined ? `/blog/post/${item.id}` : '#'} title={item.title}>
              {item.title}
            </Link>
          </h3>
          <span>{item.date}</span>
        </div>
      ))}
    </aside>
  )
}

export default LatestPostsWidget
