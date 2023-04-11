import React from 'react';
import { TextField } from '@mui/material';
import { Column } from '@tanstack/react-table';

export function Filter({ column }: { column: Column<any, any> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <TextField
      type='text'
      label={column.id}
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={'Search...'}
      size='small'
    />
  );
}
