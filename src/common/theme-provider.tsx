import { createContext } from 'react';

export const themeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleThemeMode: () => {},
});

export const { Consumer: ThemeConsumer, Provider: ThemeProvider } =
  themeContext;
