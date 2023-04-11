import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';

export function TableFooter({
  setPageIndex,
  getCanPreviousPage,
  previousPage,
  nextPage,
  getCanNextPage,
  getState,
  setPageSize,
  getPageCount,
  getRowModel,
}: any) {
  const styles = {
    footerControlsBox: {
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      marginTop: 2,
      backgroundColor: '#f3f3f3',
    },
    pageBox: {
      display: 'flex',
      alignItems: 'center',
      margin: 2,
    },
    pageBoxText: {
      marginRight: 1,
    },
    goToPage: {
      display: 'flex',
      alignItems: 'center',
      margin: 2,
    },
    goToPageText: {
      marginRight: 1,
    },
    perPageBox: {
      margin: 2,
    },
    numberOfRows: {
      marginLeft: 1,
    },
  };

  return (
    <Paper sx={styles.footerControlsBox}>
      <Box>
        <Button
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {'>'}
        </Button>
        <Button
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {'>>'}
        </Button>
      </Box>
      <Box component='span' sx={styles.pageBox}>
        <Box component='div' sx={styles.pageBoxText}>
          Page
        </Box>
        <Box component='strong'>
          {getState().pagination.pageIndex + 1} of {getPageCount()}
        </Box>
      </Box>
      <Box component='span' sx={styles.goToPage}>
        <Box component='div' sx={styles.goToPageText}>
          Go to page
        </Box>
        <TextField
          type='number'
          defaultValue={getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            setPageIndex(page);
          }}
          size='small'
        />
      </Box>
      <FormControl sx={styles.perPageBox}>
        <InputLabel id='quantity-select-label'>Per page</InputLabel>
        <Select
          labelId='quantity-select-label'
          id='quantity-select'
          value={getState().pagination.pageSize}
          label='Per page'
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          size='small'
        >
          {[10, 20, 30, 40, 50, 100, 200, 500, 1000].map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              Show {pageSize}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box component='div'>
        Number of rows
        <Box component='strong' sx={styles.numberOfRows}>
          {getRowModel().rows.length}
        </Box>
      </Box>
    </Paper>
  );
}
