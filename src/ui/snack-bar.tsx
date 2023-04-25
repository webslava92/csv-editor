import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

interface SnackBar {
  utfError: boolean;
}

export default function InfoSnackbars({ utfError }: SnackBar) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={utfError}
        id={'errorSnackBar'}
      >
        <MuiAlert severity='error' variant='filled' elevation={6}>
          Warning! The file contains characters that do not have mapped
          UTF-8 characters. The problem lines are highlighted in yellow.
          You have to fix them manually.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={!utfError}
        autoHideDuration={1000}
        id={'successSnackBar'}
      >
        <MuiAlert severity='success' variant='filled' elevation={6}>
          The file was imported successfully
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
}
