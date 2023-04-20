/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React from 'react';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import { PeriodPicker } from './period-picker';
import { PeriodFormat } from './period-format';

dayjs.extend(isBetween as any);

type Props = {
  fromValue: any;
  setFromValue: Function;
  toValue: any;
  setToValue: Function;
  error: string;
  data: any;
  setData: Function;
  format: string;
  setFormat: Function;
};

export function PeriodControl({
  fromValue,
  setFromValue,
  toValue,
  setToValue,
  error,
  data,
  setData,
  format,
  setFormat,
}: Props) {
  const handleResetDates = () => {
    setFromValue(dayjs());
    setToValue(dayjs());
  };

  function randomDate(start: any, end: any) {
    return new Date(start + Math.random() * (end - start));
  }

  const handleChangeDates = () => {
    const newDate = data.map((item: any) =>
      Object.assign(
        {},
        ...Object.entries(item).map(([key, val]: any) => ({
          [key]:
            dayjs(val).isValid() && key !== 'phone' && key !== 'id'
              ? dayjs(val).isBetween(fromValue, toValue)
                ? val
                : randomDate(fromValue, toValue)
              : val,
        }))
      )
    );
    setData(newDate);
  };

  const isDisabled = dayjs(fromValue).isSame(toValue);

  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'top',
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', md: 'row' },
    },
    pickersBox: {
      display: 'flex',
      alignItems: 'top',
      gap: 1,
      flexDirection: { xs: 'column', md: 'row' },
    },
    btnBox: { display: 'flex', justifyContent: 'center', gap: 1 },
    btn: {
      display: 'flex',
      marginTop: { xs: 1, md: 0 },
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.pickersBox}>
        <PeriodPicker
          fromValue={fromValue}
          setFromValue={setFromValue}
          toValue={toValue}
          setToValue={setToValue}
          error={error}
        />
        <PeriodFormat format={format} setFormat={setFormat} />
      </Box>
      <Box sx={styles.btnBox}>
        <Box sx={styles.btnBox}>
          <Button
            variant='contained'
            disabled={isDisabled}
            onClick={handleResetDates}
            sx={styles.btn}
          >
            Reset Dates
          </Button>
        </Box>
        <Button
          variant='contained'
          disabled={isDisabled}
          onClick={handleChangeDates}
          sx={styles.btn}
        >
          Change Dates
        </Button>
      </Box>
    </Box>
  );
}
