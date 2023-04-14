/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween as any);

type Props = {
  data: any;
  setData: Function;
};

export function DuplicateControl({
  data,
  setData,
}: Props) {
  const [keys, setKeys] = useState<any[]>(['']);
  const [key, setKey] = useState<string>('');

  useEffect(() => {
    const newKeys = Array.from(
      new Set(data.map((obj: any) => Object.keys(obj))[0])
    );
    setKeys(newKeys);
  }, [data]);

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
    wrapper: { display: 'flex', justifyContent: 'space-between' },
    pickerBox: { display: 'flex', gap: 1 },
    selectControl: { minWidth: '300px' },
    btnBox: { display: 'flex', gap: 1 },
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
            size='small'
          >
            {keys.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant='contained'
          disabled={key === ''}
          onClick={() => setKey('')}
        >
          Reset Key
        </Button>
      </Box>
      <Box sx={styles.btnBox}>
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
