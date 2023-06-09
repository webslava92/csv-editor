import React, { useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ThemeSelector } from '@common/theme-selector';
import { PeriodControl } from './period-control';
import { DuplicateControl } from './dublicate-control';
import { UploadFile } from './upload-file';
import { AddingControl } from './adding-control';
import { FunnelControl } from './funnel-control';

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

export function ControlBoard({
  data,
  setData,
  format,
  setFormat,
  setUtfError,
  uploadDateFormat,
  setUploadDateFormat,
  formats,
  setFormats,
}: any) {
  const [defaultData, setDefaultData] = useState<any>([]);
  const [fileName, setFileName] = useState<string>('');
  const [fromValue, setFromValue] = useState<Dayjs | null>(dayjs(`${`${dayjs().format('YYYY-MM-DD')}T`}00:00:00`));
  const [toValue, setToValue] = useState<Dayjs | null>(
    dayjs(`${`${dayjs().format('YYYY-MM-DD')}T`}23:59:59`)
  );
  const [error, setError] = useState<string>('');
  const [value, setValue] = useState(0);
  const [delimiter, setDelimiter] = useState<string>(',');
  const [exportDelimiter, setExportDelimiter] = useState<string>(',');

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (dayjs(toValue) >= dayjs(fromValue)) {
      setError('');
    } else {
      setError(
        // eslint-disable-next-line max-len
        'Attention! The value of "to" is less than "from".'
      );
    }
  }, [fromValue, toValue]);

  const styles = {
    wrapper: {
      padding: 2,
      marginBottom: 2,
    },
    top: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1,
      marginBottom: 2,
    },
    title: {},
  };

  return (
    <Paper sx={styles.wrapper}>
      <Box sx={styles.top}>
        <Typography variant='h5' sx={styles.title}>
          Controls
        </Typography>
        <ThemeSelector />
      </Box>
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
            <Tab label='Add' {...a11yProps(3)} />
            <Tab label='Funnels' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UploadFile
            items={data}
            setItems={setData}
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            format={format}
            fileName={fileName}
            setFileName={setFileName}
            delimiter={delimiter}
            setDelimiter={setDelimiter}
            exportDelimiter={exportDelimiter}
            setExportDelimiter={setExportDelimiter}
            setUtfError={setUtfError}
            uploadDateFormat={uploadDateFormat}
            setUploadDateFormat={setUploadDateFormat}
            formats={formats}
            setFormats={setFormats}
          />
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
            format={format}
            setFormat={setFormat}
            formats={formats}
            setFormats={setFormats}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DuplicateControl data={data} setData={setData} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AddingControl data={data} setData={setData} format={format} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <FunnelControl data={data} setData={setData} />
        </TabPanel>
      </Box>
    </Paper>
  );
}
