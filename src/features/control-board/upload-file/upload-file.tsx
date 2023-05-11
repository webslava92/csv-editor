/* eslint-disable no-nested-ternary */
import React from 'react';
import { useCSVReader } from 'react-papaparse';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { checkNonAsciiCharacters } from '@common/checkNonUTF8Characters';
import { DELIMITERS } from '@features/data-table/constants';
import { dateToISO } from '@common/dateConverter';
import { UploadFileProps } from './types';
import { JsonToCSV } from './jsonToCsv';
import { PeriodFormat } from '../period-control/period-format';

export function UploadFile({
  items,
  setItems,
  format,
  defaultData,
  setDefaultData,
  fileName,
  setFileName,
  delimiter,
  setDelimiter,
  exportDelimiter,
  setExportDelimiter,
  setUtfError,
  uploadDateFormat,
  setUploadDateFormat,
  formats,
  setFormats,
}: UploadFileProps) {
  const { CSVReader } = useCSVReader();

  const csvConfig = {
    quotes: false,
    // quoteChar: '"',
    // escapeChar: '"',
    delimiter,
    header: true,
    // dynamicTyping: true,
    // newline: '\r\n',
    skipEmptyLines: true,
    // columns: null,
  };

  const styles = {
    wrapper: {
      marginTop: 2,
      marginBottom: 2,
    },
    pickerBox: {
      display: 'flex',
      gap: 1,
    },
    selectControl: { minWidth: '75px' },
    title: {
      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.4rem' },
      fontWeight: 700,
      marginBottom: 1,
    },
    paper: {
      padding: 2,
    },
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', md: 'row' },
    },
    fileInfoBox: {
      display: 'flex',
      gap: 1,
    },
    fileBox: {
      display: 'flex',
      alignItems: 'center',
    },
    fileName: {
      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.4rem' },
      fontWeight: 700,
      display: 'flex',
      marginLeft: 2,
      minWidth: '100px',
    },
    message: {},
    errorMessage: {
      color: 'red',
    },
    acceptedFile: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      width: '100%',
    },
    fileNameBox: {
      display: 'flex',
      gap: 1,
    },
    browseFile: {},
    resetBtnBox: {
      textAlign: 'right',
      marginTop: { xs: 2, md: 0 },
    },
    resetBtn: {},
    progressBar: {
      display: 'flex',
      marginTop: 2,
      width: '100%',
    },
    addPickerBox: {
      display: 'flex',
      gap: 1,
      justifyContent: { xs: 'space-between', md: 'left' },
    },
    savePickerBox: {
      display: 'flex',
      gap: 1,
      marginTop: { xs: 2, md: 0 },
      justifyContent: { xs: 'space-between', md: 'left' },
    },
    btnBox: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
  };

  const dataWithoitId = items.map((item: any) => {
    const objCopy = { ...item };
    delete objCopy.id;
    delete objCopy.isUTF;
    return objCopy;
  });

  const newData = dataWithoitId.map((item: any) =>
    Object.assign(
      {},
      ...Object.entries(item).map(([key, val]: any) => ({
        [key]:
          dayjs(val).isValid() &&
          key !== 'phone' &&
          key !== 'id' &&
          key !== 'isUTF'
            ? dayjs(val).utc().format(format)
            : val,
      }))
    )
  );

  return (
    <Box sx={styles.wrapper}>
      <CSVReader
        config={csvConfig}
        onUploadAccepted={(results: any, acceptedFile: any) => {
          const resultWithId = results.data.map(
            (item: any, i: any = 0) => ({
              ...item,
              id: i,
              isUTF: checkNonAsciiCharacters(item),
            })
          );
          if (results) {
            setUtfError(
              !!resultWithId.filter((i: any) => i.isUTF === true).length
            );
          }
          const newResult = resultWithId.map((item: any) =>
            Object.assign(
              {},
              ...Object.entries(item).map(([key, val]: any) => ({
                [key]:
                  dayjs(val).isValid() &&
                  key !== 'phone' &&
                  key !== 'id' &&
                  key !== 'isUTF'
                    ? dayjs(val).utc().toISOString()
                    : dayjs(dateToISO(val, uploadDateFormat)).isValid()
                      ? dateToISO(val, uploadDateFormat)
                      : dayjs(dateToISO(val, 'YYYY-MM-DD')).isValid()
                        ? dateToISO(val, 'YYYY-MM-DD')
                        : dayjs(dateToISO(val, 'YYYY-DD-MM')).isValid()
                          ? dateToISO(val, 'YYYY-DD-MM')
                          : dayjs(dateToISO(val, 'DD-MM-YYYY')).isValid()
                            ? dateToISO(val, 'DD-MM-YYYY')
                            : dayjs(dateToISO(val, 'MM-DD-YYYY')).isValid()
                              ? dateToISO(val, 'MM-DD-YYYY')
                              : val,
              }))
            )
          );

          setFileName(acceptedFile.name ?? '');
          setItems(newResult);
          setDefaultData(newResult);
        }}
      >
        {({ getRootProps, ProgressBar, getRemoveFileProps }: any) => (
          <>
            <Box sx={styles.inner}>
              <Box sx={styles.fileInfoBox}>
                <Box component='div' sx={styles.acceptedFile}>
                  <Box sx={styles.fileNameBox}>
                    <Typography variant='h5' sx={styles.title}>
                      Upload file:
                    </Typography>
                    <Typography variant='body1' sx={styles.fileName}>
                      {fileName}
                    </Typography>
                  </Box>
                  <Box sx={styles.addPickerBox}>
                    <Box sx={styles.pickerBox}>
                      <FormControl sx={styles.selectControl}>
                        <InputLabel
                          id='delimiter-filter-select-label'
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          Delimiter
                        </InputLabel>
                        <Select
                          labelId='delimiter-filter-select-label'
                          id='delimiter-filter-select'
                          value={delimiter}
                          label='Delimiter'
                          onChange={(e) => {
                            setDelimiter(String(e.target.value));
                          }}
                          size='small'
                        >
                          {DELIMITERS.map((item: any) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <PeriodFormat
                      format={uploadDateFormat}
                      setFormat={setUploadDateFormat}
                      formats={formats}
                      setFormats={setFormats}
                      label={'Edit date format in the file'}
                    />
                    <Box>
                      <Button
                        variant='contained'
                        type='button'
                        {...getRootProps()}
                        sx={styles.browseFile}
                      >
                        Browse file
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={styles.btnBox}>
                <Box sx={styles.resetBtnBox}>
                  <Button
                    variant='contained'
                    sx={styles.resetBtn}
                    {...getRemoveFileProps()}
                    onClick={() => setItems(defaultData)}
                  >
                    Reset all
                  </Button>
                </Box>
                <Box sx={styles.savePickerBox}>
                  <Box sx={styles.pickerBox}>
                    <FormControl sx={styles.selectControl}>
                      <InputLabel
                        id='delimiter-filter-select-label'
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        Delimiter
                      </InputLabel>
                      <Select
                        labelId='delimiter-filter-select-label'
                        id='delimiter-filter-select'
                        value={exportDelimiter}
                        label='Delimiter'
                        onChange={(e) => {
                          setExportDelimiter(String(e.target.value));
                        }}
                        size='small'
                      >
                        {DELIMITERS.map((item: any) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <JsonToCSV
                    data={newData}
                    fileName={fileName}
                    exportDelimiter={exportDelimiter}
                  />
                </Box>
              </Box>
            </Box>
            <ProgressBar style={styles.progressBar} />
          </>
        )}
      </CSVReader>
    </Box>
  );
}
