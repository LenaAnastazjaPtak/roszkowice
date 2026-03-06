import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function PopularTagsWidget({ tags }) {
  const { t } = useTranslation('blog')
  return (
    <aside className="widget widget_tag">
      <h3 className="widget-title">{t('popularTags')}</h3>
      <div className="tags">
        {tags.map((tag) => (
          <Link key={tag} to="#" title={tag}>{tag}</Link>
        ))}
      </div>
    </aside>
  )
}

export default PopularTagsWidget
