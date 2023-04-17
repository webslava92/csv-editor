/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

export function Filters({ filters }: any) {
  const [value, setValue] = useState('');
  // const [filters, setFilters] = useState({});


  console.log('filters', filters);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h5' sx={{ marginBottom: 1 }}>
        Filters
      </Typography>
      <Grid container spacing={1}>
        {filters.map((filter: any) => (
          <Grid item key={filter}>
            <TextField
              type='text'
              label={filter}
              value={(value ?? '') as string}
              onChange={(e) => setValue(e.target.value)}
              placeholder={'Search...'}
              size='small'
              sx={{ width: '100%' }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
