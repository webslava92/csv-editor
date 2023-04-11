import React, { useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { DataTable } from '@features/data-table';
import { TopBar } from '@features/top-bar/top-bar';
import './App.css';
import { UploadFile } from '@features/upload-file';

export function App() {
  const [items, setItems] = useState<any>([]);

  const theme = useTheme();
  const styles = {
    app: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#eeeeee',
      padding: 2,
      boxSizing: 'border-box',
    },
    appInner: {
      paddingTop: '30px',
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
    },
    box: {
      maxWidth: { xs: '100%', sm: '80vw' },
      width: '100%',
      margin: '0 auto 16px',
      padding: '16px',
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '10px',
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
        <Paper sx={styles.box}>
          <Box>
            <UploadFile items={items} setItems={setItems} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <DataTable data={items} setData={setItems} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
