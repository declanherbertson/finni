import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function Patient({ data, onExit, onSave }) {
  console.warn(data)
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={onExit}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}