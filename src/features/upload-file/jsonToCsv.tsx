import { Button } from '@mui/material';
import React from 'react';
import { usePapaParse } from 'react-papaparse';

export function JsonToCSV({ data }: any) {
  const { jsonToCSV } = usePapaParse();
  const csvData = jsonToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  return <Button href={url} variant='contained'>Save csv file</Button>;
}
