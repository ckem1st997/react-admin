import React, { createContext, useContext } from 'react';

// Tạo một chủ đề và biến toàn cục
const theme = {
  primaryColor: 'light',
  secondaryColor: 'dark',
};

const globals = {
  siteName: 'Theme-change',
};

const ThemeContext = createContext(globals.siteName);

// Tạo một custom Hook để truy cập ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
