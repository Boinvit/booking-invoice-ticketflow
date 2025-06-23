
import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "system" | "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light"); // Default to light theme

  // Listen and apply theme
  useEffect(() => {
    const root = document.documentElement;

    function apply(theme: Theme) {
      if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", isDark);
      } else {
        root.classList.toggle("dark", theme === "dark");
      }
    }

    apply(theme);

    // System change handler
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      if (theme === "system") {
        apply("system");
      }
    };
    mq.addEventListener("change", update);

    return () => {
      mq.removeEventListener("change", update);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
