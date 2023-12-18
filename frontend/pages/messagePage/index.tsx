import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import discord_logo from '../../assets/discord_logo.png';
import telegram_logo from '../../assets/telegram_symbol.png';
import loading_logo from '../../assets/giphy.gif';
import  { StaticImageData } from 'next/image';

import SingleMessageHeader from '../../components/MessageBody/SingleMessageHeader';
import SingleMessageUser from '../../components/MessageBody/SingleMessageUser';
import SingleMessageBody from '../../components/MessageBody/SingleMessageBody';
import SingleMessageFooter from '../../components/MessageBody/SingleMessageFooter';

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

  
   

  return (
    <div style={{marginTop:'4%'}}>
      <Card sx={{ minWidth: 275, }}>
        <CardContent >
          
        <SingleMessageHeader message={message} />

            
        <SingleMessageUser author={message.author} />


        <SingleMessageBody message={message} />

        <SingleMessageFooter imageUrl={imageUrl} message={message} />                        
        
                       
        </CardContent>
      </Card>
    </div>
  )
}

export default index