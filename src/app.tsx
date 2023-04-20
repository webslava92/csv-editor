/* eslint-disable no-console */
import React, { useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { TopBar } from '@features/top-bar/top-bar';
import { ControlBoard } from '@features/control-board';
import './App.css';
import { DataTable } from '@features/data-table/data-table';

export function App({ theme, setTheme }: any) {
  const [items, setItems] = useState<any>([]);
  const [format, setFormat] = useState<string>('DD-MM-YYYY HH:mm:ss');
  const themeUse = useTheme();

  const styles = {
    app: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    appInner: {
      paddingTop: '22px',
      display: 'flex',
      alignItems: 'center',
    },
    box: {
      maxWidth: { xs: '100%', sm: '100%' },
      width: '100%',
      margin: '0 auto',
      padding: '16px',
      backgroundColor: themeUse.palette.primary.contrastText,
    },
    adress: {
      display: 'flex',
      fontSize: '0.9rem',
      fontWeight: 700,
      color: themeUse.palette.primary.main,
      margin: '16px auto 0',
      textAlign: 'center',
      minHeight: '1.8rem',
      wordBreak: 'break-all',
    },
    input: {
      marginTop: '16px',
      marginBottom: '16px',
      '& .MuiInput-underline:after': {
        color: themeUse.palette.primary.main,
      },
    },
    filesWrapper: {
      backgroundColor: themeUse.palette.primary.contrastText,
      boxSizing: 'border-box',
    },
  };

  return (
    <Paper sx={styles.app}>
      <TopBar />
      <Box sx={styles.appInner}>
        <Box sx={styles.box}>
          <Box sx={styles.filesWrapper}>
            <ControlBoard
              data={items}
              setData={setItems}
              format={format}
              setFormat={setFormat}
              theme={theme}
              setTheme={setTheme}
            />
            <DataTable rows={items} setData={setItems} format={format} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
