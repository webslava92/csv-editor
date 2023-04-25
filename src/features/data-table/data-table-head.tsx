import React, { ChangeEvent, MouseEvent } from 'react';
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Order } from './types';

interface DataTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, newOrderBy: any) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headers: any[];
}

export function DataTableHead(props: DataTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
  } = props;

  const headCells: any[] = [];
  headers.map((col: any, i: any) =>
    headCells.push({
      id: headers[i],
      // numeric: false,
      // disablePadding: true,
      label: headers[i],
    })
  );

  const createSortHandler =
    (newOrderBy: any) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) =>
          (headCell.id !== 'isUTF' ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ fontWeight: 700 }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : ''}
              </TableSortLabel>
            </TableCell>
          ) : '')
        )}
      </TableRow>
    </TableHead>
  );
}
