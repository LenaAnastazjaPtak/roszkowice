import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../shared/languages";

function LangSwitcherMobilePanel({ open, onClose }) {
  const { i18n, t } = useTranslation("common");
  const current = i18n.language?.slice(0, 2);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    onClose();
  };

  return (
    <div
      id="lang-switcher-mobile-panel"
      className={`lang-switcher-mobile-panel${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <div className="lang-switcher-mobile-panel__inner">
        <ul
          className="lang-switcher-mobile-panel__list"
          role="listbox"
          aria-label={t("nav.languageToggle")}
        >
          {SUPPORTED_LANGUAGES.map(({ code, label, name }) => {
            const isActive = current === code;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={open ? 0 : -1}
                  className={`lang-switcher-mobile-panel__option${
                    isActive ? " is-active" : ""
                  }`}
                  onClick={() => handleSelect(code)}
                >
                  <span className="lang-switcher-mobile-panel__code">
                    {label}
                  </span>
                  <span className="lang-switcher-mobile-panel__name">
                    {name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LangSwitcherMobilePanel;
