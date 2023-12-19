import React, {useState, useEffect} from 'react'
import { Grid, Typography } from '@mui/material';

import { Author } from '../../types/types'; 
import defaultAvatar from '../../assets/default_human.png';
function Profile({author_id}) {

    const [defaultAuthor, setDefaultAuthor] = useState<Author>({
        id: 'default_id',
        name: 'Default Name',
        nickname: 'Default Nickname',
        color: '#000000',
        discriminator: '0000',
        avatar_url: defaultAvatar,
        is_bot: false,
        timestamp_insert: 'YYYY-MM-DD HH:mm:ss',
      });

    useEffect(() => {
        const getMessageById = async (msgId) => {
          try {
            const response = await fetch(`http://localhost:5001/get_message_by_id/${msgId}`);
            if (response.ok) {
              const data = await response.json();
              setDefaultAuthor(data.author);
              
            } 
            else {
              console.error('Failed to fetch message:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching message:', error);
          }
        };
        if (author_id!==null)
        {
            getMessageById(author_id);

        }
      }, [author_id]);
    
  return (
    <div>
        <Grid sx={{ marginTop: '2%' }} container justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>

                <Grid item xs={8}>
                    <img style={{ maxWidth: '70%', height: 'auto', borderRadius: '50%' }} src={defaultAuthor.avatar_url} alt="Avatar" />
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
                    Id: {defaultAuthor.id}
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
                