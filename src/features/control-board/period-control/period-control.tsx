/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
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
  formats: string;
  setFormats: Function;
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
  formats,
  setFormats,
}: Props) {
  const handleResetDates = () => {
    setFromValue(dayjs(`${`${dayjs().format('YYYY-MM-DD')}T`}00:00:00`));
    setToValue(dayjs(`${`${dayjs().format('YYYY-MM-DD')}T`}23:59:59`));
  };

  function randomDate(start: any, end: any) {
    const startOfDay = start.startOf('day');
    const endOfDay = end.endOf('day');
    const diffSeconds = endOfDay.diff(startOfDay, 'second');

    const randomSeconds = Math.floor(Math.random() * diffSeconds);
    const newDate = startOfDay.add(randomSeconds, 'second');

    const startOfRange = newDate
      .set('hour', start.hour())
      .set('minute', start.minute())
      .set('second', start.second());
    const endOfRange = newDate
      .set('hour', end.hour())
      .set('minute', end.minute())
      .set('second', end.second());

    const isYesterday = endOfRange < startOfRange;

    const diffSecondsInRange = isYesterday
      ? startOfRange.diff(endOfRange, 'second')
      : endOfRange.diff(startOfRange, 'second');

    const randomSecondsInRange = Math.floor(
      Math.random() * diffSecondsInRange
    );

    const newRandomDate = startOfRange
      .add(randomSecondsInRange, 'second');

    return newRandomDate;
  }

  const isRandom = (val: string) =>
    !dayjs(val).isBetween(fromValue, toValue);

  function randomDepositDate(random: any, val: any, start: any, end: any) {
    const randomSeconds = Math.floor(Math.random() * (259200 - 86400) - 86400);
    const newDate = isRandom(val)
      ? random.add(2, 'day').add(randomSeconds, 'second')
      : val.add(2, 'day').add(randomSeconds, 'second');

    const startOfRange = newDate
      .set('hour', start.hour())
      .set('minute', start.minute())
      .set('second', start.second());
    const endOfRange = newDate
      .set('hour', end.hour())
      .set('minute', end.minute())
      .set('second', end.second());

    const isYesterday = endOfRange < startOfRange;

    const diffSecondsInRange = isYesterday
      ? startOfRange.diff(endOfRange, 'second')
      : endOfRange.diff(startOfRange, 'second');

    const randomSecondsInRange = Math.floor(
      Math.random() * diffSecondsInRange
    );

    const newDepositDate = startOfRange.add(
      randomSecondsInRange,
      'second'
    );

    return newDepositDate;
  }

  const handleChangeDates = () => {
    const newDate = data.map((item: any) => {
      const random = randomDate(fromValue, toValue);
      return Object.assign(
        {},
        ...Object.entries(item).map(([key, val]: any) => ({
          [key]:
            dayjs(val).isValid() &&
            key !== 'phone' &&
            key !== 'id' &&
            key !== 'isUTF'
              ? key === 'deposit_date'
                ? randomDepositDate(random, item.registration_date, fromValue, toValue)
                : isRandom(val)
                  ? random
                  : val
              : val,
        }))
      );
    });
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
          format={format}
        />
        <Box>
          <Box sx={{ display: 'block' }}>
            <PeriodFormat
              format={format}
              setFormat={setFormat}
              formats={formats}
              setFormats={setFormats}
              label={'Edit date format'}
            />
          </Box>
        </Box>
      </Box>
      <Box>
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
    </Box>
  );
}
