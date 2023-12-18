import React from 'react';
import { Dialog, DialogTitle, Typography, Button } from '@mui/material';

const TicketModal = ({ handleClose, open, handleModalDelete }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete Ticket?</DialogTitle>

      <Typography variant="h6" color="text.secondary" sx={{ marginLeft: '1%' }}>
        It is a temporary delete. Deleted data can be retrieved if the backend is restarted
      </Typography>

      <div style={{ textAlign: 'right', marginLeft: 'auto', margin: '2%' }}>
        <Button onClick={handleModalDelete} sx={{ background: 'red' }}>
          Yes, Delete
        </Button>
      </div>
    </Dialog>
  );
};

export default TicketModal;
