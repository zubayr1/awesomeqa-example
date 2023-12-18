import React from 'react';
import { Grid, Typography } from '@mui/material';

const SingleMessageBody = ({ message }) => {
  return (
    <>
      <Grid sx={{ marginTop: '2%' }} container justifyContent="space-between" alignItems="center">
        <Grid item xs={12}>
          <Typography
            sx={{
              '@media (max-width: 600px)': {
                fontSize: '20px',
              },
              '@media (min-width: 601px) and (max-width: 900px)': {
                fontSize: '24px',
              },
              '@media (min-width: 901px)': {
                fontSize: '32px',
              },
            }}
            variant="h4"
          >
            {message.content}
          </Typography>
        </Grid>
      </Grid>

      <Grid sx={{ marginTop: '2%' }} container justifyContent="space-between" alignItems="center">
        <Grid item xs={12}>
          <Typography
            sx={{
              color: '#bdc8db',
              '@media (max-width: 600px)': {
                fontSize: '16px',
              },
              '@media (min-width: 601px) and (max-width: 900px)': {
                fontSize: '20px',
              },
              '@media (min-width: 901px)': {
                fontSize: '28px',
              },
            }}
            variant="h4"
          >
            <a href={message.msg_url}>Click to View Message</a>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleMessageBody;
