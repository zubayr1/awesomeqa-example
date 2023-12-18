import React from 'react';
import { Dialog, DialogTitle, Typography, Button } from '@mui/material';

const MessagModal = ({ handleClose, open, handleModalDelete }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete Message?</DialogTitle>

      <Typography variant="h6" color="text.secondary" sx={{ marginLeft: '1%' }}>
        Deleting message will also delete corresponding ticket
      </Typography>

      <div style={{ textAlign: 'right', marginLeft: 'auto', margin: '2%' }}>
        <Button onClick={handleModalDelete} sx={{ background: 'red' }}>
          Yes, Delete
        </Button>
      </div>
    </Dialog>
  );
};

export default MessagModal;