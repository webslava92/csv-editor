/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

export function Filters({
  headers,
  rows,
  setFilteredData,
}: any) {
  const [filters, setFilters] = useState<any>({});
  const isFilters = isEmpty(filters);

  const applyFilters = (newFilters: { [x: string]: any }) => {
    let filtered = [...rows];
    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];
      if (value) {
        filtered = filtered.filter((item) => {
          const itemValue = item[key].toString().toLowerCase();
          return itemValue.indexOf(value.toLowerCase()) !== -1;
        });
      }
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (
    event: { target: { value: any } },
    key: string | number
  ) => {
    const newFilters = { ...filters };
    newFilters[key] = event.target.value;
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setFilteredData(rows);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h5' sx={{ marginBottom: 1 }}>
        Filters
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {headers.map((key: any) =>
          (key !== 'isUTF' ? (
            <TextField
              key={key}
              label={key}
              name={key}
              value={filters[key] || ''}
              onChange={(event) => handleFilterChange(event, key)}
              variant='outlined'
              style={{ marginRight: 10 }}
              size='small'
              sx={{ width: { xs: '100%', md: 'unset' } }}
            />
          ) : (
            ''
          ))
        )}
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
