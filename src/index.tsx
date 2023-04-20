import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { App } from './app';
import './index.css';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function AppContainer() {
  const [theme, setTheme] = useState<string>('dark');
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <App theme={theme} setTheme={setTheme} />
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<AppContainer />);
