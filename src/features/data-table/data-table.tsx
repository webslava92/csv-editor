/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import {
  DEFAULT_ORDER,
  DEFAULT_ORDER_BY,
  DEFAULT_ROWS_LIST,
  DEFAULT_ROWS_PER_PAGE,
} from './constants';
import { Order } from './types';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableHead } from './data-table-head';
import { EditableCell } from './editable-cell';
import { getComparator, stableSort } from './helpers';
import { Filters } from './filters';

interface FormProps {
  rows: Record<string, any>[];
  setData: Function;
  format: string;
}

export function DataTable({ rows, setData, format }: FormProps) {
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<any>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [visibleRows, setVisibleRows] = useState<any[] | null>(null);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [filteredData, setFilteredData] = useState<any>([]);

  console.log('filteredData', filteredData);

  useEffect(() => {
    setFilteredData(rows);
  }, [rows]);

  const headers = Array.from(
    new Set(rows.map((obj: any) => Object.keys(obj))[0])
  );

  useEffect(() => {
    let rowsOnMount = stableSort(
      filteredData,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, []);

  useEffect(() => {
    let updatedRows = stableSort(
      filteredData,
      getComparator(order, orderBy)
    );

    updatedRows = updatedRows.slice(
      0 * rowsPerPage,
      0 * rowsPerPage + rowsPerPage
    );

    setVisibleRows(updatedRows);
  }, [filteredData]);

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, newOrderBy: any) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        filteredData,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = stableSort(
        filteredData,
        getComparator(order, orderBy)
      );
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - filteredData.length)
          : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [rows, filteredData, order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);

      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(
        filteredData,
        getComparator(order, orderBy)
      );
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );
      setVisibleRows(updatedRows);

      setPaddingHeight(0);
    },
    [filteredData, order, orderBy]
  );

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleCellChange = (value: any, rowId: any, columnId: any) => {
    setData((prevData: any) => {
      const newData = [...prevData];
      newData[rowId][columnId] = value;
      return newData;
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Filters
          headers={headers}
          rows={rows}
          setFilteredData={setFilteredData}
        />
        <DataTableToolbar
          rows={filteredData}
          selected={selected}
          setItems={setData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setSelected={setSelected}
          dense={dense}
          setDense={setDense}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <DataTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
              headers={headers}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, rowIndex) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${rowIndex}`;

                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {Object.entries(row).map((cellValue: any) => {
                        const [key, value] = cellValue;

                        return (
                          <TableCell key={key} sx={{ padding: '2px' }}>
                            <EditableCell
                              value={value}
                              rowId={row.id}
                              columnId={key}
                              onChange={handleCellChange}
                              isEdit={isEdit}
                              format={format}
                              selected={selected}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
                : null}
              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={DEFAULT_ROWS_LIST}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
