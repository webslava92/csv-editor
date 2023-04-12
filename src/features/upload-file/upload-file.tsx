/* eslint-disable no-console */
import React from 'react';
import { useCSVReader } from 'react-papaparse';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Paper,
} from '@mui/material';
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
  const { CSVReader } = useCSVReader();

  const styles = {
    wrapper: {
      marginBottom: 2
    },
    paper: {
      padding: 2,
    },
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    fileBox: {
      display: 'flex',
      alignItems: 'center',
    },
    fileName: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 2,
    },
    message: {},
    errorMessage: {
      color: 'red',
    },
    csvReader: {},
    browseFile: {},
    acceptedFile: {},
    remove: {
      marginLeft: 1
    },
    progressBarBackgroundColor: {},
  };

  return (
    <Box sx={styles.wrapper}>
      <Paper sx={styles.paper}>
        <Box sx={styles.inner}>
          <CSVReader
            config={csvConfig}
            onUploadAccepted={(results: any) => {
              const dateParser = results.data.map((item: any) => Object.keys(item).map((key, _index) => {
                if (dayjs(item[key]).isValid()) {
                  return dayjs(item[key]).format('DD.MM.YYYY hh:mm:ss');
                }
                return item[key];
              }
              ));
              console.log('dateParser', dateParser);
              setItems(dateParser);
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
            }: any) => (
              <>
                <Box component='div' style={styles.csvReader}>
                  <Button
                    variant='contained'
                    type='button'
                    {...getRootProps()}
                    style={styles.browseFile}
                  >
                    Browse file
                  </Button>
                  <Box component='div' style={styles.acceptedFile}>
                    {acceptedFile && acceptedFile.name}
                  </Box>
                  <ProgressBar style={styles.progressBarBackgroundColor} />
                </Box>
                <Box>
                  <JsonToCSV data={items} />
                  <Button
                    variant='contained'
                    sx={styles.remove}
                    {...getRemoveFileProps()}
                  >
                    Remove
                  </Button>
                </Box>
              </>
            )}
          </CSVReader>
        </Box>
      </Paper>
    </Box>
  );
}