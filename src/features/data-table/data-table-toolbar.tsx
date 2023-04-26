/* eslint-disable no-console */
import React from 'react';
import {
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Edit, EditOff, FormatAlignJustify, TableRows } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableToolbarProps {
  rows: any[];
  selected: readonly string[];
  isEdit: boolean;
  setIsEdit: Function;
  setItems: Function;
  setSelected: Function;
  dense: boolean;
  setDense: Function;
  setUtfError: Function;
}

export function DataTableToolbar(props: DataTableToolbarProps) {
  const {
    rows,
    selected,
    isEdit,
    setIsEdit,
    setItems,
    setSelected,
    dense,
    setDense,
    setUtfError,
  } = props;

  const handleOnEdit = () => {
    setIsEdit(true);
  };

  const handleOffEdit = () => {
    setUtfError(!!rows.filter((i: any) => i.isUTF === true).length);
    setIsEdit(false);
    setSelected([]);
  };

  function handleDataRemove(items: any, ids: any) {
    const newData = items.filter((obj: any) => !ids.includes(obj.id));
    setItems(newData);
    setSelected([]);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Items
        </Typography>
      )}

      <Box sx={{ display: 'flex' }}>
        {!dense ? (
          <Tooltip title='Enable compact table mode'>
            <IconButton onClick={() => setDense(true)}>
              <FormatAlignJustify />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Turn off compact table mode'>
            <IconButton onClick={() => setDense(false)}>
              <TableRows />
            </IconButton>
          </Tooltip>
        )}
        {!isEdit ? (
          <Tooltip title='Enable editing mode'>
            <IconButton onClick={handleOnEdit}>
              <Edit />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Turn off editing mode'>
            <IconButton onClick={handleOffEdit} color='error'>
              <EditOff />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title='Delete'>
          <IconButton
            onClick={() => {
              handleDataRemove(rows, selected);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  );
}
