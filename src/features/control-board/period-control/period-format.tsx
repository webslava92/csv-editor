import React, { useState } from 'react';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { Edit, EditOff } from '@mui/icons-material';

interface PeriodProps {
  format: string;
  setFormat: Function;
  formats: string;
  setFormats: Function;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PeriodFormat({ format, setFormat, formats, setFormats, label }: PeriodProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [change, setChange] = useState<string>(formats);

  const handleChange = (event: { target: { value: any } }) => {
    setChange(event.target.value);
  };

  const handleClick = () => {
    setFormats(change);
    setFormat(change.split(', ')[0]);
    setIsEdit(!isEdit);
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: { xs: 'center', md: 'space-between' },
      flexDirection: { xs: 'column', md: 'row' },
    },
    pickerBox: {
      margin: { xs: '0 auto', md: 0 },
    },
    selectControl: { minWidth: '250px' },
    btnBox: {
      display: 'flex',
      justifyContent: 'center',
      gap: 1,
      marginTop: { xs: 2, md: 0 },
    },
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {!isEdit ? (
        <Box sx={styles.pickerBox}>
          <FormControl sx={styles.selectControl}>
            <InputLabel
              id='select-format-label'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Select date format
            </InputLabel>
            <Select
              labelId='select-format-label'
              id='key-for-select-format-select'
              value={format}
              label='Select date format'
              onChange={(e) => {
                setFormat(String(e.target.value));
              }}
              size='small'
            >
              {formats.split(', ').map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
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
          sx={{ borderRadius: 'none', width: '100%', minWidth: '250px' }}
          multiline
        />
      )}
      <Box>
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
    </Box>
  );
}
