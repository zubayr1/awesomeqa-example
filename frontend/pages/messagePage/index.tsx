import React, { useState, useEffect } from 'react';
import { Button,Grid, Typography } from "@mui/material";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; 
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 

import discord_logo from '../../assets/discord_logo.png';
import telegram_logo from '../../assets/telegram_symbol.png';
import loading_logo from '../../assets/giphy.gif';
import  { StaticImageData } from 'next/image';

import SingleMessageHeader from '../../components/MessageBody/SingleMessageHeader';
import SingleMessageUser from '../../components/MessageBody/SingleMessageUser';
import SingleMessageBody from '../../components/MessageBody/SingleMessageBody';
import SingleMessageFooter from '../../components/MessageBody/SingleMessageFooter';
import MessageModal from '../../components/Modals/MessageModal';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';


import { useRouter } from 'next/router';

import { DiscordMessage } from '../../types/types';


function index() {

  const router = useRouter();

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

  const [open, setOpen] = React.useState(false);

  const [message, setMessage] = useState<DiscordMessage>(initialMessage); 

  const [imageUrl, setImageUrl] = useState<StaticImageData>(loading_logo); 

  const [headershow, setHeadershow] = React.useState(false);

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

  const deletehandler = () =>
  {  
    setOpen(true)
  }

  const handlemodaldelete = async () =>
  {
    let msg_id = message.id;

    try {
      const _ = await axios.delete(`http://localhost:5001/delete_message/${msg_id}`);
            
      router.push('/ticketspage'); 

    } catch (error) {
      console.error('Error deleting message:', error);
    }
    
    setOpen(false);
  }


  const handleHeaderShow = () => {
    setHeadershow(prevShow => !prevShow);
  };

  
  const handleClose = () => {
    setOpen(false);
  };
   

  return (
    <div style={{marginTop:'4%'}}>

      <MessageModal
        handleClose={handleClose}
        open={open}
        handleModalDelete={handlemodaldelete}
      />

      <Card sx={{ minWidth: 275, }}>
        <CardContent >

        <Grid container justifyContent="flex-end">
            <Grid item>
              {headershow ? (
                  <KeyboardArrowUpIcon sx={{cursor:'pointer'}} color="primary" fontSize="large" onClick={() => handleHeaderShow()} />
                ) : (
                  <KeyboardArrowDownIcon sx={{cursor:'pointer'}} color="primary" fontSize="large" onClick={() => handleHeaderShow()} />
                )}
            </Grid>
          </Grid>
          

        <CSSTransition in={headershow} timeout={300} classNames="header-transition" unmountOnExit>
            <div className="header-transition">
              <SingleMessageHeader message={message} />
            </div>
          </CSSTransition>

            
        <SingleMessageUser author={message.author} />

        
        <SingleMessageBody message={message} />

        <SingleMessageFooter imageUrl={imageUrl} message={message} />                        
        
                       
        </CardContent>

        <Grid container justifyContent="center">
          <Button
            variant="contained"
            sx={{
              width: '60%',
              backgroundColor: 'red',
              color: 'white',
              marginTop:'4%',
              marginBottom: '2%',
            }}

            onClick={()=> deletehandler()}
          >
            Delete 
          </Button>
        </Grid>


      </Card>
    </div>
  )
}

export default index