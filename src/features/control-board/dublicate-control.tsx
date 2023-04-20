/* eslint-disable no-console */
import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
  data: any;
  setData: Function;
};

export function DuplicateControl({
  data,
  setData,
}: Props) {
  const [key, setKey] = useState<string>('');

  const keys = Array.from(
    new Set(data.map((obj: any) => Object.keys(obj))[0])
  );

  function duplicateRemover(arr: any, keyForFilter: string) {
    const unique = arr.filter(
      (
        (set) => (d: any) =>
          !set.has(d[keyForFilter]) && set.add(d[keyForFilter])
      )(new Set())
    );
    setData(unique);
  }

  const handleRemoveDuplicates = () => {
    if (key !== '') {
      duplicateRemover(data, key);
    }
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: { xs: 'center', md: 'space-between' },
      flexDirection: { xs: 'column', md: 'row' },
    },
    pickerBox: {
      margin: { xs: '0 auto', md: 0 },
    },
    selectControl: { minWidth: '250px' },
    btnBox: {
      display: 'flex',
      justifyContent: 'center',
      gap: 1,
      marginTop: { xs: 2, md: 0 },
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.pickerBox}>
        <FormControl sx={styles.selectControl}>
          <InputLabel
            id='key-for-duplicate-filter-select-label'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Select the key for the filter
          </InputLabel>
          <Select
            labelId='key-for-duplicate-filter-select-label'
            id='key-for-duplicate-filter-select'
            value={key}
            label='Select the key for the filter'
            onChange={(e) => {
              setKey(String(e.target.value));
            }}
            // size='small'
          >
            {keys.map((item: any) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={styles.btnBox}>
        <Button
          variant='contained'
          disabled={key === ''}
          onClick={() => setKey('')}
        >
          Reset Key
        </Button>
        <Button
          variant='contained'
          disabled={key === ''}
          onClick={handleRemoveDuplicates}
        >
          Remove Duplicates
        </Button>
      </Box>
    </Box>
  );
}
