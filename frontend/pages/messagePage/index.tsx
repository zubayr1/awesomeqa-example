import React, { useState, useEffect } from 'react';

import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import discord_logo from '../../assets/discord_logo.png';
import telegram_logo from '../../assets/telegram_symbol.png';
import loading_logo from '../../assets/giphy.gif';
import Image, { StaticImageData } from 'next/image';

import { DiscordMessage } from '../../types/types';


function index() {

  const initialMessage: DiscordMessage = {
    id: null,
    channel_id: null,
    parent_channel_id: null,
    community_server_id: null,
    timestamp: null,
    has_attachment: false,
    reference_msg_id: null,
    timestamp_insert: null,
    discussion_id: null,
    author_id: null,
    content: null,
    msg_url: null,
    author: {
      id: null,
      name: null,
      nickname: null,
      color: null,
      discriminator: null,
      avatar_url: null,
      is_bot: false,
      timestamp_insert: null,
    },
  };

  const [message, setMessage] = useState<DiscordMessage>(initialMessage); 

  const [imageUrl, setImageUrl] = useState<StaticImageData>(loading_logo); 

  useEffect(() => {
    const id = localStorage.getItem("id");

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/get_message/${id}`);
        if (response.ok) 
        {
          const data = await response.json();    
                   
          setMessage(data);     
          
          if (data.msg_url.includes("discord"))
          {
            setImageUrl(discord_logo);
          }
          else
          {
            setImageUrl(telegram_logo);
          }

        } 
        else 
        {
          setMessage(initialMessage)
        }
      } catch (error) 
      {
        setMessage(initialMessage)
      }
    };

    
    fetchData();
    
    
    
  }, []);

  
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
    <div style={{marginTop:'4%'}}>
      <Card sx={{ minWidth: 275, }}>
        <CardContent >
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
                              color:'red',
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
                              color:'green',
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

            
          <Grid sx={{marginTop:'2%'}} container justifyContent="space-between" alignItems="center">
                <Grid item xs={8}>
                    <img style={{maxWidth:'40%', height:'auto', borderRadius:'50%'}} src={message.author.avatar_url}/>
                </Grid>
                
                <Grid item xs={4}>
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
                            }} color="text.secondary" gutterBottom>
                            Id: {message.author.id}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
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
                            Name: {message.author.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
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
                            Nickname: {message.author.nickname}
                        </Typography>
                      </Grid>

                    </Grid>
                </Grid>
            </Grid>


            <Grid sx={{marginTop:'2%'}} container justifyContent="space-between" alignItems="center">
              <Grid item xs={12}>
                    <Typography sx={{
                        '@media (max-width: 600px)': {
                          fontSize: '20px',
                        },
                        '@media (min-width: 601px) and (max-width: 900px)': {
                          fontSize: '24px', 
                        },
                        '@media (min-width: 901px)': {
                          fontSize: '32px', 
                        },
                      }} variant='h4'>
                          {message.content}
                    </Typography>
              </Grid>

            </Grid>


            <Grid sx={{marginTop:'2%'}} container justifyContent="space-between" alignItems="center">
              <Grid item xs={12}>
                    <Typography sx={{
                      color:'#bdc8db',
                        '@media (max-width: 600px)': {
                          fontSize: '16px',
                        },
                        '@media (min-width: 601px) and (max-width: 900px)': {
                          fontSize: '20px', 
                        },
                        '@media (min-width: 901px)': {
                          fontSize: '28px', 
                        },
                      }} variant='h4'>
                          <a href={message.msg_url}>Click to View Message</a>
                    </Typography>
              </Grid>

            </Grid>

                          
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
                       
        </CardContent>
      </Card>
    </div>
  )
}

export default index