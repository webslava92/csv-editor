/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';

interface FormProps {
  data: Record<string, any>[];
  setData: Function;
  format: string;
}

export function AddingControl({ data, setData, format }: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [newData, setNewData] = useState<Record<string, any>[]>([]);

  const fieldOrder = data.length && Object.keys(data[0]);

  const fields = data.length && Object.entries(data[0]).map((item: any) => ({
    [item[0]]: !!(
      dayjs(item[1]).isValid() &&
      item[0] !== 'phone' &&
      item[0] !== 'id'
    ),
  }));

  useEffect(() => {
    if (data.length && !isEmpty(newData)) {
      setData([...data, newData[0]]);
    }
  }, [newData]);

  const handleInputChange = (key: any, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: String(value),
    }));
  };

  const handleReset = () => {
    setNewData([]);
    setFormData({});
  };

  const handleSubmit = () => {
    const dataWithId: Record<string, any> = {
      ...formData,
      id: data.length,
    };
    const orderedData =
      fieldOrder &&
      fieldOrder.reduce(
        (acc, key: string) => ({ ...acc, [key]: dataWithId[key] }),
        {}
      );
    if (data.length) {
      setNewData((prevData: any) => [...prevData, orderedData]);
    }
    setFormData({});
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {data.length && fields && fields.map((field: Record<string, any>) =>
        (Object.entries(field)[0][1] ? (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            key={Object.entries(field)[0][0]}
          >
            <Box>
              <DateTimePicker
                label='Registration date'
                format={format}
                value={formData[Object.entries(field)[0][0]] || dayjs()}
                onChange={handleInputChange}
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
        ) : (
          <TextField
            key={Object.entries(field)[0][0]}
            label={Object.entries(field)[0][0]}
            disabled={Object.entries(field)[0][0] === 'id'}
            value={
              Object.entries(field)[0][0] === 'id'
                ? data.length
                : formData[Object.entries(field)[0][0]] || ''
            }
            onChange={(e) =>
              handleInputChange(
                Object.entries(field)[0][0],
                e.target.value
              )}
            size='small'
          />
        ))
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Button onClick={handleReset} variant='contained'>
          Reset
        </Button>
        <Button onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
