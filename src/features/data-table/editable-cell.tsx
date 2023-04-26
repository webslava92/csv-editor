import React, { useEffect, useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';
import { dateToISO } from '@common/dateConverter';

dayjs.extend(utc);
dayjs.extend(timezone);

export function EditableCell({
  value,
  rowId,
  columnId,
  onChange,
  isEdit,
  format,
  selected,
}: any) {
  const isDate =
    dayjs(dateToISO(value as string, format)).isValid() &&
    columnId !== 'phone' &&
    columnId !== 'id' &&
    columnId !== 'isUTF';

  const [dateTime, setDateTime] = useState<any>(dayjs());

  useEffect(() => {
    if (isDate) {
      setDateTime(dayjs(value).utc());
    }
  }, []);

  const handleChange = (event?: { target: { value: any } }, val?: any) => {
    setDateTime(val);
    onChange(val ? dateTime : event?.target.value, rowId, columnId);
  };

  const handleDateChange = (val: any) => {
    setDateTime(val);
    onChange(val, rowId, columnId);
  };

  const isEditable = selected.find((select: any) => select === rowId);

  if (isEdit && (isEditable || isEditable === 0)) {
    if (
      dayjs(dateToISO(value as string, format)).isValid() &&
      columnId !== 'phone' &&
      columnId !== 'id' &&
      columnId !== 'isUTF'
    ) {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <DateTimePicker
              label='Registration date'
              format={format}
              value={dayjs(dateToISO(value, format)).utc() || dayjs()}
              onChange={(val) => handleDateChange(val)}
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
            />
          </Box>
        </LocalizationProvider>
      );
    } if (columnId === 'id') {
      return <Box component='div'>{value}</Box>;
    } if (columnId === 'isUTF') {
      return null;
    } return (
      <TextField
        value={value}
        onChange={handleChange}
        size='small'
        inputProps={{
          sx: {
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'none',
          },
        }}
        sx={{ borderRadius: 'none', width: '100%' }}
      />
    );
  } return (
    <Box component='div'>
      {dayjs(dateToISO(value as string, format)).isValid() &&
      columnId !== 'phone' &&
      columnId !== 'id' &&
      columnId !== 'isUTF'
        ? dayjs(dateToISO(value as string, format))
          .format(format)
        : value}
    </Box>
  );
}
