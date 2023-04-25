import React from 'react';
import { usePapaParse } from 'react-papaparse';
import { CSVLink } from 'react-csv';
import { Button, useTheme } from '@mui/material';

export function JsonToCSV({ data, fileName, exportDelimiter }: any) {
  const { jsonToCSV } = usePapaParse();
  const theme = useTheme();

  const csvData = jsonToCSV(data, { delimiter: exportDelimiter });

  return (
    <Button variant='contained'>
      <CSVLink
        data={csvData}
        filename={`${fileName.split('.')[0]}-final`}
        style={{
          color: String(theme.palette.primary.contrastText),
          textDecoration: 'none',
        }}
        uFEFF={false}
      >
        Save CSV
      </CSVLink>
    </Button>
  );
}
