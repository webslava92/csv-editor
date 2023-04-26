/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit, EditOff } from '@mui/icons-material';
import dayjs from 'dayjs';
import { dateToISO } from '@common/dateConverter';

type Props = {
  data: any;
  setData: Function;
  format: string;
};

const filters = [
  {
    language: 'RU EU',
    funnels:
      'SpaceX RU, LatvEnergy Originally, LibraCoin Максимизатор, JP Morgan Chase Quiz, ЕU Partnership, Total Gas&Oil, SwedbankAI Chat, Xiaomi Invest, TeslaX RU, Paypal Quiz new, Revolut Quiz, BNP Paribas Quiz, PayPal Coin RU',
  },
  {
    language: 'PL',
    funnels:
      'Solaris Originally, iOwn PL, Baltic pipe Project, Pattern PL, Enea, Oil Profit PL, Paypal Coin PL, Shell PL, Bitcoin Polska 2, Invest in Amazon PL, Bitcoin Supreme PL, Quantum code PL, Gemini 2 PL, Bitcoin Era, Bitcoin Profit PL, CD Project, PZU, Amacash PL, Google PL, Lotos, MasterCash PL, Tesla X, ORLEN, PGE Group, NIGMA',
  },
  {
    language: 'RU',
    funnels:
      'SpaceX RU, Bitcoin Profit RU, Каспий нефть, Максимизатор, Большие деньги, Наше Дело, Алроса Quiz, Роснефть Quiz, Tinkoff Quiz small, Сбербанк Quiz, ТОН Дуров RU, НБК Инвест, Bitcoin Bank RU, Цепная реакция, РБК, VTB investments Quiz, Tinkoff Quiz, GazpromBank Quiz, Сберкоин, Газпром, Shell RU, Всегда+',
  },
  {
    language: 'CZ',
    funnels:
      'CEZ Group, Etoro quiz CZ, Portu CZ, Bitcoin Loophole CZ, Bitcoin Prague, Bitcoin profit CZ, eKrona CZ, Success code CZ, Bitcoin Era CZ, Profi Max, Crypto Engine, Komarek system, ORLEN UNIPETROL, Skoda CZ',
  },
];

export function FunnelControl({ data, setData, format }: Props) {
  const [key, setKey] = useState<string>('');
  const [funnelKey, setFunnelKey] = useState<string>('funnel');
  const [currentFunnels, setCurrentFunnels] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isFunnelKeyEdit, setIsFunnelKeyEdit] = useState<boolean>(false);

  const keys = Array.from(
    new Set(filters.map((filter: any) => filter.language))
  );

  const funnelsKeys = Array.from(
    new Set(data.map((obj: any) => Object.keys(obj))[0])
  );

  useEffect(() => {
    const current = filters.find((item: any) => item.language === key);
    if (current) {
      setCurrentFunnels(current.funnels);
    }
  }, [key]);

  const handleReset = () => {
    setKey('');
    setFunnelKey('funnel');
    setCurrentFunnels('');
  };

  const handleChangeFunnelsList = (event: { target: { value: any } }) => {
    setCurrentFunnels(event.target.value);
  };

  function randomFunnel(arr: any[]) {
    const random = Math.floor(Math.random() * arr.length);
    return random;
  }

  const handleChangeFunnels = () => {
    const arr = currentFunnels.split(', ');
    const newData = data.map((item: any) =>
      Object.assign(
        {},
        ...Object.entries(item).map(([k, v]: any) => ({
          [k]:
            (String(v).includes('.') && k === funnelKey) ||
            (k === funnelKey && dayjs(dateToISO(v, format)).isValid())
              ? arr[randomFunnel(arr)]
              : v,
        }))
      )
    );
    setData(newData);
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: { xs: 'center', md: 'space-between' },
      flexDirection: { xs: 'column', md: 'row' },
    },
    fieldsBox: {
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 1,
      justifyContent: 'center',
    },
    pickerBox: {
      margin: { xs: '0 auto', md: 0 },
    },
    selectControl: { minWidth: '250px' },
    funnelsFieldBox: {
      display: 'flex',
      gap: 1,
      marginTop: { xs: 2, md: 0 },
    },
    funnelsField: {
      minWidth: '300px',
    },
    btnBox: {
      display: 'flex',
      justifyContent: 'center',
      gap: 1,
      marginTop: { xs: 2, md: 0 },
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.fieldsBox}>
        <Box sx={styles.pickerBox}>
          <FormControl sx={styles.selectControl}>
            <InputLabel
              id='key-for-funnel-filter-select-label'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Select the key for the filter
            </InputLabel>
            <Select
              labelId='key-for-funnel-filter-select-label'
              id='key-for-funnel-filter-select'
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
        <Box sx={styles.funnelsFieldBox}>
          <TextField
            label={'Funnels list'}
            value={currentFunnels}
            onChange={handleChangeFunnelsList}
            multiline
            fullWidth
            maxRows={4}
            disabled={!isEdit}
            sx={styles.funnelsField}
            InputLabelProps={
              currentFunnels !== ''
                ? {
                  shrink: true,
                  disabled: false,
                }
                : {}
            }
          />
          <Box>
            <IconButton onClick={() => setIsEdit(!isEdit)}>
              {!isEdit ? (
                <Tooltip title='Enable funnels list editing mode'>
                  <Edit />
                </Tooltip>
              ) : (
                <Tooltip title='Turn off time funnels list editing mode'>
                  <EditOff />
                </Tooltip>
              )}
            </IconButton>
          </Box>
        </Box>
        <Box sx={styles.funnelsFieldBox}>
          <Box sx={styles.pickerBox}>
            <FormControl sx={styles.selectControl}>
              <InputLabel
                id='key-for-funnels-filter-select-label'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Select the key for the filter
              </InputLabel>
              <Select
                labelId='key-for-funnels-filter-select-label'
                id='key-for-funnels-filter-select'
                defaultValue='funnel'
                value={funnelKey}
                label='Select the key for the filter'
                disabled={!isFunnelKeyEdit}
                onChange={(e) => {
                  setFunnelKey(String(e.target.value));
                }}
                // size='small'
              >
                {funnelsKeys.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <IconButton
              onClick={() => setIsFunnelKeyEdit(!isFunnelKeyEdit)}
            >
              {!isFunnelKeyEdit ? (
                <Tooltip title='Enable key editing mode'>
                  <Edit />
                </Tooltip>
              ) : (
                <Tooltip title='Turn off key list editing mode'>
                  <EditOff />
                </Tooltip>
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={styles.btnBox}>
          <Button
            variant='contained'
            disabled={key === ''}
            onClick={handleReset}
          >
            Reset All
          </Button>
          <Button
            variant='contained'
            disabled={key === ''}
            onClick={handleChangeFunnels}
          >
            Update funnels
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
