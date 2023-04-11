import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { TextField } from '@mui/material';
// import { DataType } from './types';

export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = React.useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <TextField
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        size='small'
      />
    );
  },
};
