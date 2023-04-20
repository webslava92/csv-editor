/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { usePapaParse } from 'react-papaparse';
import { CSVLink } from 'react-csv';
import { Button, useTheme } from '@mui/material';

export function JsonToCSV({ data, fileName }: any) {
  const { jsonToCSV } = usePapaParse();
  const theme = useTheme();

  const csvData = jsonToCSV(data);

  return (
    <Button variant='contained'>
      <CSVLink data={csvData} filename={`${fileName.split('.')[0]}-final`} style={{ color: 'white', textDecoration: 'none' }}>
        Save CSV
      </CSVLink>
    </Button>
  );
}
