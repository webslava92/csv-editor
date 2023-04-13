/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { TextField, styled } from '@mui/material';
import dayjs from 'dayjs';


const TableCell = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: 0,
  },
}));

export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table, cell }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <TableCell
        value={
          (dayjs(value as string).isValid() && cell.column.id !== 'phone')
            ? dayjs(value as string).format('DD.MM.YYYY hh:mm:ss')
            : value
        }
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        size='small'
        inputProps={{
          sx: {
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'none',
          },
        }}
        sx={{ bprderRadius: 'none' }}
      />
    );
  },
};
