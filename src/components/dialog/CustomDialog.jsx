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
        <Button onClick={onClose}>لغو</Button>
        <Button onClick={onConfirm}>تایید</Button>
      </DialogActions>
    </Dialog>
  );
}
