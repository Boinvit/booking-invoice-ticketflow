
import { useEffect } from "react";

/**
 * Deprecated: Use ThemeProvider/useTheme instead!
 * Maintained for backward compatibility.
 */
export function useSystemDarkMode() {
  useEffect(() => {
    // This is now handled by ThemeProvider.
  }, []);
}
