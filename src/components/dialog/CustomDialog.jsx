import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

export default function CatalogDialog({ header, open, onClose, onConfirm, children }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{display: 'flex', justifyContent: 'right'}}>
        <Button sx={{color: '#D1AB48'}} onClick={onClose}>لغو</Button>
        <Button sx={{color: '#D1AB48'}} onClick={() => {
          onConfirm();
          onClose();
          }}>تایید</Button>
      </DialogActions>
    </Dialog>
  );
}
