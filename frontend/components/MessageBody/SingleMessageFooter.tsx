import React from 'react';
import { Grid, Typography } from '@mui/material';
import  Image from 'next/image';


const SingleMessageFooter = ({ imageUrl, message }) => {
  
    const getDiscriminatorTextColor = (discriminator) => {
        if (discriminator < 1000) {
          return 'green';
        } else if (discriminator >= 1000 && discriminator <= 3000) {
          return 'yellow';
        } else {
          return 'red';
        }
      };

  return (
    <Grid sx={{marginTop:'2%'}} container justifyContent="space-between" alignItems="center">

              <Grid item xs={6}>
                <div style={{ width: '40%', height: '30%', position: 'relative' }}>
                  <Image src={imageUrl} alt="Source Logo" layout="responsive" objectFit="contain" />
                </div>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right' }}>                    
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography sx={{
                            '@media (max-width: 600px)': {
                              fontSize: '12px',
                            },
                            '@media (min-width: 601px) and (max-width: 900px)': {
                              fontSize: '16px', 
                            },
                            '@media (min-width: 901px)': {
                              fontSize: '20px', 
                            },
                            color: getDiscriminatorTextColor(message.author.discriminator)
                          }} color="text.secondary" gutterBottom>
                          Discriminator: {message.author.discriminator}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      {
                        message.has_attachment ? 
                        (
                          <Typography sx={{
                            '@media (max-width: 600px)': {
                              fontSize: '14px',
                            },
                            '@media (min-width: 601px) and (max-width: 900px)': {
                              fontSize: '18px', 
                            },
                            '@media (min-width: 901px)': {
                              fontSize: '20px', 
                            },
                            }} color="text.primary" gutterBottom>
                            Has Attachment
                          </Typography>
                        ):
                        (
                          <Typography sx={{
                            '@media (max-width: 600px)': {
                              fontSize: '14px',
                            },
                            '@media (min-width: 601px) and (max-width: 900px)': {
                              fontSize: '18px', 
                            },
                            '@media (min-width: 901px)': {
                              fontSize: '20px', 
                            },
                            }} color="text.primary" gutterBottom>
                            No Attachment
                          </Typography>
                        )
                      }
                      
                    </Grid>                     

                  </Grid>
                </Grid>

              <Grid item xs={6}>
                
              </Grid>
            </Grid>
  );
};

export default SingleMessageFooter;
