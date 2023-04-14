/* eslint-disable no-console */
import React from 'react';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import { PeriodPicker } from './period-picker';

dayjs.extend(isBetween as any);

type Props = {
  fromValue: any;
  setFromValue: Function;
  toValue: any;
  setToValue: Function;
  error: string;
  data: any;
  setData: Function;
};

export function PeriodControl({
  fromValue,
  setFromValue,
  toValue,
  setToValue,
  error,
  data,
  setData,
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
            dayjs(val).isValid() && key !== 'phone'
              ? randomDate(fromValue, toValue)
              : val,
        }))
      )
    );
    setData(newDate);
  };

  const isDisabled = dayjs(fromValue).isSame(toValue);

  const styles = {
    wrapper: { display: 'flex', justifyContent: 'space-between' },
    pickersBox: { display: 'flex', gap: 1 },
    btnBox: { display: 'flex', gap: 1 },
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
        <Button variant='contained' disabled={isDisabled} onClick={handleResetDates}>
          Reset Dates
        </Button>
      </Box>
      <Box sx={styles.btnBox}>
        <Button variant='contained' disabled={isDisabled} onClick={handleChangeDates}>
          Change Dates
        </Button>
      </Box>
    </Box>
  );
}
