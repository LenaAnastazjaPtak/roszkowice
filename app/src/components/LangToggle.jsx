import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../shared/languages";

function LangToggle() {
  const { i18n, t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const current = i18n.language?.slice(0, 2);
  const currentLanguage = SUPPORTED_LANGUAGES.find(({ code }) => code === current);

  useEffect(() => {
    if (!open) return undefined;

    const close = () => setOpen(false);
    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <li
      className={`lang-toggle${open ? " is-open" : ""}`}
      ref={containerRef}
    >
      <button
        type="button"
        className={`lang-toggle__trigger${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="lang-toggle-panel"
        aria-label={`${t("nav.languageToggle")}: ${currentLanguage?.name ?? current}`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="lang-toggle__trigger-inner">
          <i className="fa fa-globe lang-toggle__globe" aria-hidden="true" />
          <span className="lang-toggle__current">
            {currentLanguage?.label ?? current}
          </span>
          <i
            className="fa fa-caret-down lang-toggle__caret"
            aria-hidden="true"
          />
        </span>
      </button>
      <div
        id="lang-toggle-panel"
        className={`lang-toggle__panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <ul
          className="lang-toggle__list"
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
                  className={`lang-toggle__option${isActive ? " is-active" : ""}`}
                  onClick={() => handleSelect(code)}
                >
                  <span className="lang-toggle__code">{label}</span>
                  <span className="lang-toggle__name">{name}</span>
                  {isActive ? (
                    <span className="lang-toggle__check" aria-hidden="true">
                      <i className="fa fa-check" />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default LangToggle;
