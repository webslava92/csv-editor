/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { Edit, EditOff } from '@mui/icons-material';

interface PeriodProps {
  format: string;
  setFormat: Function;
}

export function PeriodFormat({ format, setFormat }: PeriodProps) {
  const [isEdit, setIsEdit] = useState(false);
  const handleChange = (event: { target: { value: any } }) => {
    setFormat(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        value={format}
        onChange={handleChange}
        size='small'
        disabled={!isEdit}
        inputProps={{
          sx: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'none',
          },
        }}
        sx={{ borderRadius: 'none', width: '100%' }}
      />
      <IconButton onClick={() => setIsEdit(!isEdit)}>
        {!isEdit ? (
          <Tooltip title='Enable format editing mode'>
            <Edit />
          </Tooltip>
        ) : (
          <Tooltip title='Turn off time format editing mode'>
            <EditOff />
          </Tooltip>
        )}
      </IconButton>
    </Box>
  );
}
