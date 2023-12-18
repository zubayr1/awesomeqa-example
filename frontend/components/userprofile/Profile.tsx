import React from 'react'
import { Grid, Typography } from '@mui/material';

function profile({author}) {
  return (
    <div>
        <Grid sx={{ marginTop: '2%' }} container justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>

                <Grid item xs={8}>
                    <img style={{ maxWidth: '70%', height: 'auto', borderRadius: '50%' }} src={author.avatar_url} alt="Avatar" />
                </Grid>

            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography
                    sx={{
                        '@media (max-width: 600px)': {
                        fontSize: '12px',
                        },
                        '@media (min-width: 601px) and (max-width: 900px)': {
                        fontSize: '16px',
                        },
                        '@media (min-width: 901px)': {
                        fontSize: '20px',
                        },
                    }}
                    color="text.secondary"
                    gutterBottom
                    >
                    Id: {author.id}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography
                    sx={{
                        '@media (max-width: 600px)': {
                        fontSize: '14px',
                        },
                        '@media (min-width: 601px) and (max-width: 900px)': {
                        fontSize: '18px',
                        },
                        '@media (min-width: 901px)': {
                        fontSize: '20px',
                        },
                    }}
                    color="text.primary"
                    gutterBottom
                    >
                    Name: {author.name}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography
                    sx={{
                        '@media (max-width: 600px)': {
                        fontSize: '14px',
                        },
                        '@media (min-width: 601px) and (max-width: 900px)': {
                        fontSize: '18px',
                        },
                        '@media (min-width: 901px)': {
                        fontSize: '20px',
                        },
                    }}
                    color="text.primary"
                    gutterBottom
                    >
                    Nickname: {author.nickname}
                    </Typography>
                </Grid>
                </Grid>
            </Grid>
            </Grid>
    </div>
  )
}

export default profile