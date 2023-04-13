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
  const styles = {
    wrapper: { display: 'flex', justifyContent: 'space-between' },
  };

  // function isCorrectDate(curent: string) {
  //   const formated = dayjs(dayjs(curent).format('DD-MM-YYYY hh:mm:ss'));
  //   const isCorrect = formated >= fromValue && formated <= toValue;
  //   console.log('isCorrect', isCorrect);

  //   return !isCorrect;
  // }

  const handleChangeDates = () => {
    const from = dayjs(fromValue);
    const to = dayjs(toValue);
    const periodTime = to.diff(from, 'second') / data.length;

    const newDate = data.map((item: any) =>
      Object.assign(
        {},
        ...Object.entries(item).map(([key, val]: any) => ({
          [key]: (dayjs(val).isValid() && key !== 'phone')
            ? dayjs(fromValue + periodTime).toISOString()
            : val,
        }))
      )
    );
    console.log('newDate', newDate);

    console.log('periodTime', periodTime);
    setData(newDate);
  };

  return (
    <Box sx={styles.wrapper}>
      <PeriodPicker
        fromValue={fromValue}
        setFromValue={setFromValue}
        toValue={toValue}
        setToValue={setToValue}
        error={error}
      />
      <Button variant='contained' onClick={handleChangeDates}>
        Change Dates
      </Button>
    </Box>
  );
}
