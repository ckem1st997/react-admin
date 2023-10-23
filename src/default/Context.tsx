import { EuiThemeColorMode } from "@elastic/eui";
import { createContext } from "react";

export const ThemeToggeContext = createContext<{
    theme: EuiThemeColorMode | null;
    setTheme: React.Dispatch<React.SetStateAction<EuiThemeColorMode>>;
  }>({
    theme: 'dark',
    setTheme: () => 'dark',
  });