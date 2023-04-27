import React, { useState } from 'react';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { Edit, EditOff } from '@mui/icons-material';

interface PeriodProps {
  format: string;
  setFormat: Function;
  label: string;
}

export function PeriodFormat({ format, setFormat, label }: PeriodProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [change, setChange] = useState(format);

  const handleChange = (event: { target: { value: any } }) => {
    setChange(event.target.value);
  };

  const handleClick = () => {
    setIsEdit(!isEdit);
    setFormat(change);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        label={label}
        value={change}
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
      <IconButton onClick={handleClick}>
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
