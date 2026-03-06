import { useTranslation } from 'react-i18next'
import PageBanner from '../components/PageBanner'

function RegulaminPage() {
  const { t } = useTranslation('common')

  return (
    <>
      <PageBanner title={t('footer.terms')} image="/images/roszkowice/park/20251019_161301.jpg" />
      <div className="section-padding"></div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h4>§ 1 Lorem ipsum</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h4>§ 2 Dolor sit amet</h4>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Curabitur pretium tincidunt lacus. Nulla facilisi. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo.
            </p>
            <h4>§ 3 Consectetur adipiscing</h4>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
            </p>
            <h4>§ 4 Sed do eiusmod</h4>
            <p>
              Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
              Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
            </p>
            <h4>§ 5 Tempor incididunt</h4>
            <p>
              Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo.
              Nam lacinia libero et velit. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
            </p>
          </div>
        </div>
      </div>
      <div className="padding-100"></div>
    </>
  )
}

export default RegulaminPage
