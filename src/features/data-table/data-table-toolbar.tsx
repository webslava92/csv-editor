import React from 'react';
import { Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

interface DataTableToolbarProps {
  rows: any[];
  selected: readonly string[];
  isEdit: boolean;
  setIsEdit: Function;
  setItems: Function;
}

export function DataTableToolbar(props: DataTableToolbarProps) {
  const { rows, selected, isEdit, setIsEdit, setItems } = props;

  function handleDataRemove(objects: any, ids: any) {
    const newData = objects.filter((obj: any) => !ids.includes(obj.id));
    setItems(newData);
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
      {selected.length > 0 ? (
        <Box sx={{ display: 'flex' }}>
          <Tooltip title='Edit mode'>
            <IconButton onClick={() => setIsEdit(!isEdit)}>
              <Edit />
            </IconButton>
          </Tooltip>
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
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Tooltip title='Edit mode'>
            <IconButton onClick={() => setIsEdit(!isEdit)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter list'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}
