import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataTable } from '@features/data-table';
import { TopBar } from '@features/top-bar/top-bar';
import { UploadFile } from '@features/upload-file';
import { ControlBoard } from '@features/control-board';
import './App.css';

export function App() {
  const [items, setItems] = useState<any>([]);

  const theme = useTheme();
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
      backgroundColor: theme.palette.primary.contrastText,
    },
    adress: {
      display: 'flex',
      fontSize: '0.9rem',
      fontWeight: 700,
      color: theme.palette.primary.main,
      margin: '16px auto 0',
      textAlign: 'center',
      minHeight: '1.8rem',
      wordBreak: 'break-all',
    },
    input: {
      marginTop: '16px',
      marginBottom: '16px',
      '& .MuiInput-underline:after': {
        color: theme.palette.primary.main,
      },
    },
    filesWrapper: {
      backgroundColor: theme.palette.primary.contrastText,
      boxSizing: 'border-box',
    },
  };

  return (
    <Box sx={styles.app}>
      <TopBar />
      <Box sx={styles.appInner}>
        <Box sx={styles.box}>
          <Box>
            <UploadFile items={items} setItems={setItems} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <ControlBoard data={items} setData={setItems} />
            <DataTable data={items} setData={setItems} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
