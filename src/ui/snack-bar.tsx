import React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

interface SnackBar {
  utfError: boolean;
  open: boolean;
  setOpen: Function;
}

export default function InfoSnackbars({ utfError, open, setOpen }: SnackBar) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {utfError ? (
        <Snackbar open={open} id={'errorSnackBar'}>
          <MuiAlert severity='error' variant='filled' elevation={6}>
            Warning! The file contains characters that do not have mapped
            UTF-8 characters. The problem lines are highlighted in yellow.
            You have to fix them manually.
          </MuiAlert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          id={'successSnackBar'}
          onClose={() => setOpen(false)}
        >
          <MuiAlert severity='success' variant='filled' elevation={6}>
            The file was imported successfully
          </MuiAlert>
        </Snackbar>
      )}
    </Stack>
  );
}
