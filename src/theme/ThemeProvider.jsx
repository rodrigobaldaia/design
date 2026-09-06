import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * ThemeProvider — light/dark mode for the portfolio.
 *
 * Chakra UI v3 no longer ships a color-mode manager; its styled-system
 * `_dark` condition targets the `.dark` class on `<html>`, so this provider
 * simply owns that class (plus `colorScheme` for native form controls and
 * scrollbars) and persists the choice to localStorage.
 *
 * The matching pre-paint logic lives inline in index.html to prevent a
 * flash of the wrong theme.
 */

const STORAGE_KEY = "portfolio-theme";

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
};

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  const toggleTheme = useCallback(() => {
    // Flag <html> briefly so index.css can transition the whole tree,
    // then flip the theme and clean up.
    const root = document.documentElement;
    root.classList.add("theming");
    window.setTimeout(() => root.classList.remove("theming"), 450);

    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  // Follow the OS preference until the user makes an explicit choice.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      const next = e.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
