/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Filter } from './filter';
import { defaultColumn } from './defaultColumn';
import { TableFooter } from './tableFooter';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: unknown
    ) => void;
  }
}

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export function DataTable({ data, setData }: any) {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowSelection, setRowSelection] = React.useState({});

  const headers = Array.from(
    new Set(data.map((obj: any) => Object.keys(obj))[0])
  );

  const columnData: any[] = [];
  headers.map((col: any, i: any) =>
    columnData.push({
      accessorKey: headers[i],
      footer: (props: any) => props.column.id,
    })
  );

  const checkboxes = {
    id: 'select',
    header: useCallback(
      ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      []
    ),
    cell: useCallback(
      ({ row }: any) => (
        <Box component='div'>
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
      []
    ),
  };

  const removeRow = (row: any) => {
    const newData = data.filter((item: any) => item.id !== row.original.id);
    setData(newData);
    console.log('row', row);
    console.log('newData', newData);
  };

  const actions = {
    id: 'actions',
    header: useCallback(
      ({ table }: any) => (
        <Box>Actions</Box>
      ),
      []
    ),
    cell: useCallback(
      ({ row }: any) => (
        <IconButton onClick={() => removeRow(row)}>
          <Delete />
        </IconButton>
      ),
      []
    ),
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [checkboxes, ...columnData, actions],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setData((old: any[]) =>
          old.map((row: any, index: number) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  const styles = {
    wrapper: {
      padding: 2,
    },
    head: {},
    headerCellBox: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 3
    },
    headerTitle: {
      fontSize: '1rem',
      fontWeight: 700,
      padding: 1,
      marginRight: 1
    },
    headCell: {
      padding: '2px',
      border: 'none',
    },
    tableCell: {
      padding: 0,
      border: 'none',
    },
  };

  // const handleRemoveRow = () => {
  //   const checkedRows = Object.keys(rowSelection).map((item) =>
  //     parseInt(item, 10)
  //   );
  //   const findRow = table.options.data.find(
  //     (item, index) => index === checkedRows[0]
  //   );
  //   const newData = data.filter((item: any) => item.id !== findRow.id);
  //   setData(newData);
  //   console.log('newData', newData);
  // };

  return (
    <Paper sx={styles.wrapper}>
      {/* <Button
        onClick={handleRemoveRow}
      >
        Remove
      </Button> */}
      <Typography variant='h5'>Filters</Typography>
      <Box>
        <Table>
          <TableHead sx={styles.head}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={styles.headCell}
                  >
                    {header.column.getCanFilter() ? (
                      <Box sx={{ display: 'flex' }}>
                        <Filter column={header.column} />
                      </Box>
                    ) : null}
                    {header.isPlaceholder ? null : (
                      <Box
                        component='div'
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <Box sx={styles.headerCellBox}>
                          {header.column.getCanSort() ? (
                            <Typography
                              variant='body1'
                              sx={styles.headerTitle}
                            >
                              {header.column.id.charAt(0).toUpperCase() +
                                header.column.id
                                  .slice(1)
                                  .split('_')
                                  .join(' ')}
                            </Typography>
                          ) : null}
                          {
                            {
                              asc: <KeyboardArrowUp />,
                              desc: <KeyboardArrowDown />,
                            }[header.column.getIsSorted() as string]
                          }
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody sx={{ border: '1px solid #ccc' }}>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} sx={styles.tableCell}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TableFooter
        setPageIndex={table.setPageIndex}
        getCanPreviousPage={table.getCanPreviousPage}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        getCanNextPage={table.getCanNextPage}
        getPageCount={table.getPageCount}
        getRowModel={table.getRowModel}
        getState={table.getState}
        setPageSize={table.setPageSize}
        rowSelection={rowSelection}
        table={table}
      />
    </Paper>
  );
}
