import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function PopularTagsWidget({ tags }) {
  const { t } = useTranslation('blog')
  const [searchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')

  return (
    <aside className="widget widget_tag">
      <h3 className="widget-title">{t('popularTags')}</h3>
      <div className="tags">
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog?tag=${encodeURIComponent(tag)}`}
            title={tag}
            className={activeTag && activeTag.toLowerCase() === tag.toLowerCase() ? 'active' : ''}
          >
            {tag}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default PopularTagsWidget
