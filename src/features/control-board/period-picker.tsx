/* eslint-disable no-console */
import React from 'react';
import { Box, InputAdornment, Typography } from '@mui/material';
import {
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { CalendarMonth } from '@mui/icons-material';

type Props = {
  fromValue: any;
  setFromValue: Function;
  toValue: any;
  setToValue: Function;
  error: string;
};

export function PeriodPicker({ fromValue, setFromValue, toValue, setToValue, error }: Props) {
  const handleChangeFromValue = (newValue: Dayjs | null) => {
    setFromValue(newValue);
  };

  const handleChangeToValue = (newValue: Dayjs | null) => {
    setToValue(newValue);
  };

  const styles = {
    wrapper: {
      display: 'flex',
    },
    title: {
      textAlign: 'center',
    },
    periodBox: {
      display: 'flex',
      alignItems: 'center',
    },
    pickerBox: {
      position: 'relative',
    },
    periodPickerFrom: {
      display: 'flex',
      marginRight: 1,
    },
    periodPickerTo: {
      display: 'flex',
      marginLeft: 1,
    },
    helperText: {
      color: 'red',
      fontSize: '0.7rem',
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Box component='div'>
        {/* <Typography variant='h6' sx={styles.title}>
          {''}
        </Typography> */}
        <Box sx={styles.periodBox}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={styles.pickerBox}>
              <DateTimePicker
                label='Choose the initial period'
                format='DD.MM.YYYY hh:mm:ss'
                value={fromValue}
                onChange={handleChangeFromValue}
                slotProps={{
                  textField: {
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    },
                    size: 'small',
                  },
                }}
                sx={styles.periodPickerFrom}
              />
              <Typography sx={styles.helperText}>{''}</Typography>
            </Box>
          </LocalizationProvider>
          <Typography variant='body1'>-</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={styles.pickerBox}>
              <DateTimePicker
                label='Choose the end period'
                format='DD.MM.YYYY hh:mm:ss'
                value={toValue}
                onChange={handleChangeToValue}
                slotProps={{
                  textField: {
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    },
                    size: 'small',
                  },
                }}
                sx={styles.periodPickerTo}
              />
              <Typography sx={styles.helperText}>{error}</Typography>
            </Box>
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
}
