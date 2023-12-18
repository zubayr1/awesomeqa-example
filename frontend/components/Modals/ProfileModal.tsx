import React from 'react';
import { Dialog, DialogTitle, Typography, Button } from '@mui/material';

const ProfileModal = ({ handleClose, open, handleModalDelete }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Ban User?</DialogTitle>

      <Typography variant="h6" color="text.secondary" sx={{ marginLeft: '1%' }}>
        Messages from the user and corresponding tickets will not be shown anymore
      </Typography>

      <div style={{ textAlign: 'right', marginLeft: 'auto', margin: '2%' }}>
        <Button onClick={handleModalDelete} sx={{ background: 'red' }}>
          Yes, Ban
        </Button>
      </div>
    </Dialog>
  );
};

export default ProfileModal;
