/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { PeriodControl } from './period-control';
import { DuplicateControl } from './dublicate-control';
import { UploadFile } from './upload-file';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function ControlBoard({ data, setData }: any) {
  const [fromValue, setFromValue] = useState<Dayjs | null>(dayjs());
  const [toValue, setToValue] = useState<Dayjs | null>(dayjs());
  const [error, setError] = useState<string>('');
  const [value, setValue] = useState(0);

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (dayjs(toValue) >= dayjs(fromValue)) {
      setError('');
    } else setError('The value cannot be less than the value "from"');
  }, [toValue]);

  const styles = {
    wrapper: {
      padding: 2,
      marginBottom: 2,
    },
    title: {
      marginBottom: 2,
    },
  };

  return (
    <Paper sx={styles.wrapper}>
      <Typography variant='h5' sx={styles.title}>
        Controls
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label='Control Tabs'
          >
            <Tab label='File' {...a11yProps(0)} />
            <Tab label='Period' {...a11yProps(1)} />
            <Tab label='Duplicates' {...a11yProps(2)} />
            <Tab label='Adding' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UploadFile items={data} setItems={setData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PeriodControl
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            setToValue={setToValue}
            error={error}
            data={data}
            setData={setData}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DuplicateControl data={data} setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Adding
        </TabPanel>
      </Box>
    </Paper>
  );
}
