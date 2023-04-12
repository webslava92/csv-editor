import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { TextField, styled } from '@mui/material';


const TableCell = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: 0,
  },
}));

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
      <TableCell
        value={value as string}
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
