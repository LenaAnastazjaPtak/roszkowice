import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation('common')
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/?search=${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <>
      <div className="container-fluid no-padding page-banner">
        <div className="container">
          <h3>404</h3>
        </div>
      </div>
      <div className="error-page container-fluid no-padding">
        <div className="padding-50"></div>
        <div className="container">
          <img src="/images/404.png" alt="404" />
          <div className="error-content">
            <h3><span>{t('notFound.ups')}</span> {t('notFound.title')}</h3>
            <form className="input-group" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                placeholder={t('notFound.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" title={t('notFound.search')} type="submit">{t('notFound.search')}</button>
              </span>
            </form>
            <p className="error-back-link">
              <Link to="/">{t('notFound.backHome')}</Link>
            </p>
          </div>
        </div>
        <div className="section-padding"></div>
      </div>
    </>
  )
}

export default NotFoundPage
