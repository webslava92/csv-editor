import React, { useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { TopBar } from '@features/top-bar/top-bar';
import { ControlBoard } from '@features/control-board';
import './App.css';
import { DataTable } from '@features/data-table/data-table';
import InfoSnackbars from './ui/snack-bar';

export function App() {
  const [items, setItems] = useState<any>([]);
  const [formats, setFormats] = useState<string>(
    // eslint-disable-next-line max-len
    'YYYY-MM-DD HH:mm:ss, MM-DD-YYYY HH:mm:ss, YYYY.MM.DD HH:mm:ss, MM.DD.YYYY HH:mm:ss, YYYY-MM-DD, MM-DD-YYYY, YYYY.MM.DD, MM.DD.YYYY'
  );
  const [format, setFormat] = useState<string>(formats.split(', ')[0]);
  const [uploadDateFormat, setUploadDateFormat] = useState<string>(
    formats.split(', ')[0]
  );
  const [utfError, setUtfError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (items.length) {
      setOpen(true);
    }
  }, [utfError, items]);
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
              formats={formats}
              setFormats={setFormats}
              setUtfError={setUtfError}
              uploadDateFormat={uploadDateFormat}
              setUploadDateFormat={setUploadDateFormat}
            />
            <InfoSnackbars
              utfError={utfError}
              open={open}
              setOpen={setOpen}
            />
            <DataTable
              rows={items}
              setData={setItems}
              format={format}
              setUtfError={setUtfError}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
