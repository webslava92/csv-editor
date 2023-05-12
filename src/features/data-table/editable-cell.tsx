import React, { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';

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
  const [dateTime, setDateTime] = useState<any>(dayjs(value));

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
      dayjs(value as string).isValid() &&
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
              value={dayjs(value) || dayjs()}
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
      {dayjs(value as string).isValid() &&
      columnId !== 'phone' &&
      columnId !== 'id' &&
      columnId !== 'isUTF'
        ? dayjs(value as string)
          .format(format)
        : value}
    </Box>
  );
}
