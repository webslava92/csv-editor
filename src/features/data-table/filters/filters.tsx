import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  // InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { isEmpty } from 'lodash';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { CalendarMonth } from '@mui/icons-material';
// import dayjs from 'dayjs';

export function Filters({
  fields,
  rows,
  setFilteredData,
}: any) {
  const [filters, setFilters] = useState<any>({});
  const isFilters = isEmpty(filters);
  const theme = useTheme();

  useEffect(() => {
    let filtered = [...rows];
    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value) {
        filtered = filtered.filter((item) => {
          const itemValue = item[key].toString().toLowerCase();
          return itemValue.indexOf(value.toLowerCase()) !== -1;
        });
      }
    });
    setFilteredData(filtered);
  }, [filters]);

  const handleFilterChange = (
    event: { target: { value: any } },
    key: string | number,
    isDate: boolean
  ) => {
    const newFilters = { ...filters };
    newFilters[key] =
      // eslint-disable-next-line no-nested-ternary
      key === 'isUTF' && event.target.value === 'All'
        ? ''
        : isDate
          ? event.target.value
          : event.target.value;
    setFilters(newFilters);
  };

  // useEffect(() => {
  //   const newFilters = { ...filters };
  //   if (utfError) {
  //     newFilters.isUTF = 'true';
  //     setFilters(newFilters);
  //   } else {
  //     newFilters.isUTF = '';
  //     setFilters(newFilters);
  //   }
  // }, [utfError, rows]);

  const clearFilters = () => {
    setFilters({});
    setFilteredData(rows);
  };

  const styles = {
    pickerBox: {
      display: 'flex',
      gap: 1,
    },
    selectControl: { minWidth: '75px' },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h5' sx={{ marginBottom: 1 }}>
        Filters
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {fields &&
          fields.map((field: Record<string, any>) => {
            const key = Object.entries(field)[0][0];
            const isDate = Object.entries(field)[0][1];
            if (
              key !== 'isUTF'
            ) {
              return (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  value={filters[key] || ''}
                  onChange={(event) =>
                    handleFilterChange(event, key, isDate)}
                  variant='outlined'
                  style={{ marginRight: 10 }}
                  size='small'
                  sx={{ width: { xs: '100%', md: 'unset' } }}
                />
              );
            }
            // if (isDate) {
            // return (
            // eslint-disable-next-line react/jsx-no-undef
            // <LocalizationProvider dateAdapter={AdapterDayjs} key={key}>
            //   <Box>
            //     <DateTimePicker
            //       label={key}
            //       format={format}
            //       value={dayjs(filters[key]) || dayjs().format(format)}
            //       onChange={(event) => handleFilterChange(event, key)}
            //       slotProps={{
            //         textField: {
            //           InputProps: {
            //             endAdornment: (
            //               <InputAdornment position='end'>
            //                 <CalendarMonth />
            //               </InputAdornment>
            //             ),
            //           },
            //           size: 'small',
            //         },
            //       }}
            //     />
            //   </Box>
            // </LocalizationProvider>
            // );
            // }
            return (
              <Box sx={styles.pickerBox} key={key}>
                <FormControl sx={styles.selectControl}>
                  <InputLabel
                    id='UTF-8-filter-select-label'
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    Charset
                  </InputLabel>
                  <Select
                    labelId='UTF-8-filter-select-label'
                    id='UTF-8-filter-select'
                    value={filters[key] || 'All'}
                    label='Charset'
                    onChange={(event) =>
                      handleFilterChange(
                        event,
                        key,
                        isDate
                      )}
                    size='small'
                    sx={{
                      backgroundColor: filters[key]
                        ? theme.palette.error.light
                        : 'transparent',
                    }}
                  >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'true'}>Not UTF-8</MenuItem>
                    <MenuItem value={'false'}>UTF-8</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            );
          })}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button
            onClick={clearFilters}
            variant='contained'
            disabled={isFilters}
          >
            Reset filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
