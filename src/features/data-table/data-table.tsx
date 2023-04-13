/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
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

  const columns = useMemo<ColumnDef<any>[]>(() => columnData, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
    headCell: {
      padding: '2px 2px 24px 2px',
      border: 'none',
    },
    tableCell: {
      padding: 0,
      border: 'none',
    },
  };

  return (
    <Paper sx={styles.wrapper}>
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
      />
    </Paper>
  );
}
