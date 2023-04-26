/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useState,
  useEffect,
} from 'react';
import dayjs from 'dayjs';
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
  useTheme,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import { checkNonUTF8Characters } from '@common/checkNonUTF8Characters';
import { dateToISO } from '@common/dateConverter';
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
  utfError: boolean;
  setUtfError: Function;
}

export function DataTable({
  rows,
  setData,
  format,
  utfError,
  setUtfError,
}: FormProps) {
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
  const theme = useTheme();

  console.log('rows', rows);

  useEffect(() => {
    const data = rows.map((item: any) =>
      Object.assign(
        {},
        ...Object.entries(item).map(([key, val]: any) => ({
          [key]:
            key !== 'phone' &&
            key !== 'id' &&
            key !== 'isUTF' &&
            (dayjs(dateToISO(val, format)).isValid())
              ? dayjs(dateToISO(val, format)).format(format)
              : val,
        }))
      )
    );
    setData(data);
    setFilteredData(data);
  }, [format]);

  useEffect(() => {
    setFilteredData(rows);
  }, [rows]);

  const headers = Array.from(
    new Set(rows.map((obj: any) => Object.keys(obj))[0])
  );

  const fields =
    rows.length &&
    Object.entries(rows[0]).map((item: any) => ({
      [item[0]]: !!(
        dayjs(dateToISO(item[1], format)).isValid() &&
        item[0] !== 'phone' &&
        item[0] !== 'id' &&
        item[0] !== 'isUTF'
      ),
    }));

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
      newData[rowId].isUTF = checkNonUTF8Characters(value);
      return newData;
    });
    // setUtfError(!!rows.filter((i: any) => i.isUTF === true).length);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Filters
          fields={fields}
          rows={rows}
          setFilteredData={setFilteredData}
          utfError={utfError}
          // format
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
          setUtfError={setUtfError}
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
                      sx={{
                        '&:hover': {
                          backgroundColor: row.isUTF
                            ? `${yellow[100]} !important`
                            : 'unset',
                        },
                        '& .MuiCheckbox-root': {
                          pointerEvents: 'auto',
                        },
                        backgroundColor: row.isUTF
                          ? yellow[100]
                          : 'unset',
                      }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          sx={{
                            color:
                                // eslint-disable-next-line no-nested-ternary
                                theme.palette.mode !== 'dark'
                                  ? 'rgba(0,0,0,0.6)'
                                  : row.isUTF
                                    ? 'rgba(0,0,0,0.87)'
                                    : 'rgba(255,255,255,0.7)',
                          }}
                        />
                      </TableCell>
                      {Object.entries(row).map((cellValue: any) => {
                        const [key, value] = cellValue;

                        return (
                          <TableCell
                            key={key}
                            sx={{
                              color: row.isUTF
                                ? 'rgba(0,0,0,0.87)'
                                : 'unset',
                              padding: '2px',
                            }}
                          >
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
                : ''}
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
