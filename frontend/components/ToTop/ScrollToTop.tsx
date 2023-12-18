import React from 'react';
import { Paper, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = ({ isVisible, scrollToTop }) => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        display: isVisible ? 'block' : 'none',
        zIndex: 9999,
        padding: '8px',
        borderRadius: '50%',
      }}
    >
      <Button
        onClick={scrollToTop}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<KeyboardArrowUpIcon />}
      >
        Scroll To Top
      </Button>
    </Paper>
  );
};

export default ScrollToTop;
