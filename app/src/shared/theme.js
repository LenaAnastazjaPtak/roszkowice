export const THEME_STORAGE_KEY = "site-theme";

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";

const VALID_THEMES = new Set([THEME_LIGHT, THEME_DARK]);

export function isValidTheme(value) {
  return VALID_THEMES.has(value);
}

export function readStoredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (!isValidTheme(stored)) {
    throw new Error(`Invalid stored theme: ${stored}`);
  }
  return stored;
}

export function applyTheme(theme) {
  if (!isValidTheme(theme)) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
