import { useTranslation } from "react-i18next";

function LangSwitcherMobileToggle({ open, onToggle }) {
  const { t } = useTranslation("common");

  return (
    <button
      type="button"
      className={`lang-switcher-mobile-toggle${open ? " is-open" : ""}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls="lang-switcher-mobile-panel"
      aria-label={t("nav.languageToggle")}
      onClick={onToggle}
    >
      <i className="fa fa-globe" aria-hidden="true" />
    </button>
  );
}

export default LangSwitcherMobileToggle;
