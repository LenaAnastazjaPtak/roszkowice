import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function BlogSearchWidget({ value, onChange }) {
  const { t } = useTranslation('blog')
  const [internalValue, setInternalValue] = useState('')
  const isControlled = value !== undefined && onChange !== undefined
  const currentValue = isControlled ? value : internalValue
  const handleChange = (e) => (isControlled ? onChange(e) : setInternalValue(e.target.value))

  return (
    <aside className="widget widget_search">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={t('searchPlaceholder')}
          value={currentValue}
          onChange={handleChange}
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
        </span>
      </div>
    </aside>
  )
}

export default BlogSearchWidget
