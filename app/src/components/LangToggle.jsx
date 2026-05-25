import { useTranslation } from "react-i18next";

function LangToggle() {
  const { i18n } = useTranslation("common");

  return (
    <div className="lang-toggle">
      <button
        type="button"
        className={`lang-option${i18n.language === "pl" ? " active" : ""}`}
        onClick={() => i18n.changeLanguage("pl")}
        aria-label="Polski"
      >
        PL
      </button>
      <span className="lang-separator">|</span>
      <button
        type="button"
        className={`lang-option${i18n.language === "en" ? " active" : ""}`}
        onClick={() => i18n.changeLanguage("en")}
        aria-label="English"
      >
        EN
      </button>
      <span className="lang-separator">|</span>
      <button
        type="button"
        className={`lang-option${i18n.language === "de" ? " active" : ""}`}
        onClick={() => i18n.changeLanguage("de")}
        aria-label="Deutsch"
      >
        DE
      </button>
    </div>
  );
}

export default LangToggle;
