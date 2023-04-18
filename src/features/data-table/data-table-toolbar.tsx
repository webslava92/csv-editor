import React from 'react';
import {
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Edit, EditOff } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

interface DataTableToolbarProps {
  rows: any[];
  selected: readonly string[];
  isEdit: boolean;
  setIsEdit: Function;
  setItems: Function;
  setSelected: Function;
}

export function DataTableToolbar(props: DataTableToolbarProps) {
  const { rows, selected, isEdit, setIsEdit, setItems, setSelected } =
    props;

  const handleOnEdit = () => {
    setIsEdit(true);
  };

  const handleOffEdit = () => {
    setIsEdit(false);
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
        {!isEdit ? (
          <Tooltip title='Enable editing mode'>
            <IconButton onClick={handleOnEdit}>
              <Edit />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Turn off editing mode'>
            <IconButton onClick={handleOffEdit}>
              <EditOff />
            </IconButton>
          </Tooltip>
        )}
        {selected.length > 0 ? (
          <Tooltip title='Delete'>
            <IconButton
              onClick={() => {
                handleDataRemove(rows, selected);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Filter list'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Toolbar>
  );
}
