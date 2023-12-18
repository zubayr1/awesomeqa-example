import React from 'react';
import { Grid, Typography } from '@mui/material';

const SingleMessageHeader = ({ message }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography
          variant="h6"
          sx={{
            '@media (max-width: 600px)': {
              fontSize: '12px',
            },
            '@media (min-width: 601px) and (max-width: 900px)': {
              fontSize: '16px',
            },
            '@media (min-width: 901px)': {
              fontSize: '18px',
            },
          }}
        >
          Message Id: {message.id}
        </Typography>
      </Grid>

      <Grid item sx={{ textAlign: 'right' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                '@media (max-width: 600px)': {
                  fontSize: '10px',
                },
                '@media (min-width: 601px) and (max-width: 900px)': {
                  fontSize: '16px',
                },
                '@media (min-width: 901px)': {
                  fontSize: '20px',
                },
              }}
            >
              {message.timestamp}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {message.author.is_bot ? (
              <Typography
                variant="h6"
                sx={{
                  color: 'red',
                  '@media (max-width: 600px)': {
                    fontSize: '16px',
                  },
                  '@media (min-width: 601px) and (max-width: 900px)': {
                    fontSize: '18px',
                  },
                  '@media (min-width: 901px)': {
                    fontSize: '20px',
                  },
                }}
              >
                BOT
              </Typography>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: 'green',
                  '@media (max-width: 600px)': {
                    fontSize: '16px',
                  },
                  '@media (min-width: 601px) and (max-width: 900px)': {
                    fontSize: '18px',
                  },
                  '@media (min-width: 901px)': {
                    fontSize: '20px',
                  },
                }}
              >
                HUMAN
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleMessageHeader;
