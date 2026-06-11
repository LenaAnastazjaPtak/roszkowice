import { createContext, useCallback, useContext, useState } from "react";
import {
  THEME_DARK,
  THEME_LIGHT,
  applyTheme,
  readStoredTheme,
} from "../shared/theme";

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    return readStoredTheme();
  } catch {
    return THEME_LIGHT;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      applyTheme(next);
      return next;
    });
  }, []);

  const value = {
    theme,
    isDark: theme === THEME_DARK,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
