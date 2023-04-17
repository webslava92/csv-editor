/* eslint-disable no-console */
import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
// import dayjs from 'dayjs';
import { Box, Button, Typography } from '@mui/material';
import { UploadFileProps } from './types';
import { JsonToCSV } from './jsonToCsv';

const csvConfig = {
  quotes: false,
  // quoteChar: '"',
  // escapeChar: '"',
  delimiter: ',',
  header: true,
  // dynamicTyping: true,
  // newline: '\r\n',
  skipEmptyLines: true,
  // columns: null,
};

export function UploadFile({ items, setItems }: UploadFileProps) {
  const [defaultData, setDefaultData] = useState<any>([]);
  const { CSVReader } = useCSVReader();

  const styles = {
    wrapper: {
      marginTop: 2,
      marginBottom: 2,
    },
    title: {
      textAlign: 'center',
      marginBottom: 1,
    },
    paper: {
      padding: 2,
    },
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    fileInfoBox: {
      display: 'flex',
    },
    fileBox: {
      display: 'flex',
      alignItems: 'center',
    },
    fileName: {
      fontSize: '24px',
      display: 'flex',
      marginLeft: 2,
      minWidth: '100px',
    },
    message: {},
    errorMessage: {
      color: 'red',
    },
    csvReader: {},
    browseFile: {},
    acceptedFile: {},
    remove: {
      marginLeft: 1,
    },
    progressBar: {
      display: 'flex',
      marginTop: 2,
      width: '100%',
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <CSVReader
        config={csvConfig}
        onUploadAccepted={(results: any) => {
          const resultWithId = results.data.map(
            (item: any, i: any = 0) => ({ ...item, id: i })
          );
          setItems(resultWithId);
          setDefaultData(resultWithId);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <Box sx={styles.inner}>
              <Box sx={styles.fileInfoBox}>
                <Box component='div' style={styles.acceptedFile}>
                  <Typography variant='h5' sx={styles.title}>
                    Upload file:
                  </Typography>
                  <Box component='div' style={styles.csvReader}>
                    <Button
                      variant='contained'
                      type='button'
                      {...getRootProps()}
                      style={styles.browseFile}
                    >
                      Browse file
                    </Button>
                  </Box>
                </Box>
                <Box sx={styles.fileName}>
                  <Typography variant='h5'>
                    {acceptedFile && acceptedFile.name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <JsonToCSV data={items} />
                <Button
                  variant='contained'
                  sx={styles.remove}
                  {...getRemoveFileProps()}
                  onClick={() => setItems(defaultData)}
                >
                  Reset all
                </Button>
              </Box>
            </Box>
            <ProgressBar style={styles.progressBar} />
          </>
        )}
      </CSVReader>
    </Box>
  );
}
