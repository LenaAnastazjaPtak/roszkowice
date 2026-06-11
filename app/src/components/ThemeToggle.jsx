import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";

function ThemeToggle({ variant = "desktop" }) {
  const { t } = useTranslation("common");
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? t("nav.themeLight") : t("nav.themeDark");

  if (variant === "mobile") {
    return (
      <button
        type="button"
        className="theme-toggle theme-toggle--mobile"
        aria-label={label}
        onClick={toggleTheme}
      >
        <i
          className={`fa ${isDark ? "fa-sun-o" : "fa-moon-o"}`}
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <li className="theme-toggle theme-toggle--desktop">
      <button
        type="button"
        className="theme-toggle__trigger"
        aria-label={label}
        onClick={toggleTheme}
      >
        <i
          className={`fa ${isDark ? "fa-sun-o" : "fa-moon-o"}`}
          aria-hidden="true"
        />
      </button>
    </li>
  );
}

export default ThemeToggle;
