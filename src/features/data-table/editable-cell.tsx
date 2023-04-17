import { Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';


export function EditableCell({ value, rowId, columnId, onChange, isEdit }: any) {
  const handleChange = (event: { target: { value: any } }) => {
    onChange(event.target.value, rowId, columnId);
  };

  return isEdit ? (
    <TextField
      value={
        dayjs(value as string).isValid() &&
        columnId !== 'phone' &&
        columnId !== 'id'
          ? dayjs(value as string).format('DD.MM.YYYY hh:mm:ss')
          : value
      }
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
  ) : (
    <Box component='div'>
      {dayjs(value as string).isValid() &&
      columnId !== 'phone' &&
      columnId !== 'id'
        ? dayjs(value as string).format('DD.MM.YYYY hh:mm:ss')
        : value}
    </Box>
  );
}
