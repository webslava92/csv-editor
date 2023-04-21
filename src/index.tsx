import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, grey, indigo } from '@mui/material/colors';
import { themeContext } from '@common/theme-provider';
import { App } from './app';
import './index.css';

const createAppTheme = (theme?: 'light' | 'dark') => {
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&$focused': {
              color: theme === 'light' ? indigo[500] : grey[50],
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: theme === 'light' ? '' : cyan[200],
          },
        },
      },
    },
  });

  return muiTheme;
};

function AppContainer() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );
  const colorTheme = useMemo(
    () => ({
      toggleThemeMode: () => {
        setTheme((prevTheme) => {
          const newTheme = prevTheme === 'light' ? 'dark' : 'light';

          localStorage.setItem('theme', newTheme);

          return newTheme;
        });
      },
    }),
    []
  );

  const muiTheme = createAppTheme(theme);
  useEffect(() => {
    Object.assign(window, { theme: muiTheme });
  }, [muiTheme]);

  return (
    <themeContext.Provider value={colorTheme}>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </themeContext.Provider>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<AppContainer />);
