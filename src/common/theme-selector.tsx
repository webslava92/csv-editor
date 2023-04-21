import React, { useContext } from 'react';
import { useTheme, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { themeContext } from './theme-provider';

export function ThemeSelector() {
  const theme = useTheme();
  const themeMode = useContext(themeContext);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='flex-end'
      height='100%'
    >
      <IconButton
        onClick={themeMode.toggleThemeMode}
        color='inherit'
        size='large'
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
