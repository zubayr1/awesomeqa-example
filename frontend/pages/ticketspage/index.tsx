import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { Button, Paper } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Expand from '@mui/icons-material/Expand';
import UnfoldLess from '@mui/icons-material/UnfoldLess';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { useRouter } from 'next/router';

type Ticket = {
    id: string;
    msg_id: string;
    status: string;
    resolved_by: string | null;
    ts_last_status_change: string | null;
    timestamp: string;
    context_messages: string[];
  };

function index() {

    const router = useRouter();

    const [tickets, setTickets] = useState<Ticket[]>([]); 

    const [ticketcount, setTicketCount] = useState(0); 

    const [searchTicket, setSearchTicket] = useState(""); 

    const [expandList, setExpandList] = useState(Array.from({ length: 20 }, () => 0));

    const [expanded, setExpanded] = useState(false); 

    const [isVisible, setIsVisible] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [deleteIndex, setDeleteIndex] = useState(-1);


    const defaultTicket: Ticket = {id: "null", msg_id: "null", status: "null", resolved_by: "null", 
        ts_last_status_change: "null", timestamp: "null", context_messages: []};


        const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:5001/all_tickets/${ticketcount}`);
              if (response.ok) 
              {
                const data = await response.json();    
                         
                setTickets((prevTickets) => [...prevTickets, ...data]);
              
              } 
              else 
              {
                setTickets([defaultTicket])
              }
            } catch (error) 
            {
              setTickets([defaultTicket])
            }
          };


    useEffect(() => {        
        console.log('check');
        
        fetchData();
        
      }, []);


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5001/all_tickets/${ticketcount}`);
            if (response.ok) 
            {
              const data = await response.json();    
                       
              setTickets(data);              
            } 
            else 
            {
              setTickets([defaultTicket])
            }
          } catch (error) 
          {
            setTickets([defaultTicket])
          }
        };
    
        if (searchTicket=="")
        {
            fetchData();
        }
        
        
      }, [searchTicket]);

      


      const handlebuttonclick =() =>
      {
        setTicketCount(ticketcount+20);     

        fetchData();
        
        const updatedList = [...expandList, ...Array(20).fill(0)];
        setExpandList(updatedList);

      }


      const handleSearch = async (e)=>
      {
        e.preventDefault();
        
        if(searchTicket!=='')
        {
            try 
            {
                const response = await fetch(`http://localhost:5001/get_ticket_by_id/${searchTicket}`);
                if (response.ok) 
                {
                const data = await response.json();    
                            
                setTickets(data);              
                } 
                else 
                {
                setTickets([defaultTicket])
                }
            } catch (error) 
            {
                setTickets([defaultTicket])
            }
        }
                  
        
       }

      const handleexpandclick = (index: number) =>
      {
        const updatedList = [...expandList];
        if(updatedList[index] ==0)
        {
            updatedList[index] = 1;
        }
        else
        {
            updatedList[index] = 0;
        }
        
        setExpandList(updatedList);
        
      }

      const handleExpandAllClick = (value) =>
      {
        setExpanded(value)
        if (value==true)
        {
            setExpandList(Array.from({ length: expandList.length }, () => 1))
        }
        else
        {
            setExpandList(Array.from({ length: expandList.length }, () => 0))
        }
      }


      const handlecardclick = (index) =>
      {
        localStorage.setItem("id", String(tickets[index]["id"]));
        router.push('/messagePage');        
      }


      const deletehandler = (index) =>
      {
        setDeleteIndex(index)

        setOpen(true)
      }


      const handlemodaldelete = async () =>
      {
        try 
        {
            const response = await fetch(`http://localhost:5001/delete_ticket/${deleteIndex}`, 
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error('Unable to delete ticket');
            }
            const updatedTickets = await response.json();
            setTickets(updatedTickets);

            // setTicketCount(ticketcount-1);
            
            const updatedExpandList = [
                ...expandList.slice(0, deleteIndex),
                ...expandList.slice(deleteIndex + 1)
            ];
            setExpandList(updatedExpandList);

            setOpen(false);
        
        }   catch (error) {
            throw new Error('Could not delete ticket');
        }

        
      }


      const toggleVisibility = () => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    
      useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
          window.removeEventListener('scroll', toggleVisibility);
        };
      }, []);


      const handleClose = () => {
        setOpen(false);
        setDeleteIndex(-1);
      };
    

  return (
    <div>

    <Dialog  onClose={handleClose} open={open}>
      <DialogTitle>Delete Ticket?</DialogTitle>

      <Typography variant="h6" color="text.secondary" sx={{marginLeft:'1%'}}>
        It is a temporary delete. Deleted data can be retrieved if page is refreshed
      </Typography>

      
      <div style={{ textAlign: 'right', marginLeft: 'auto', margin:'2%' }}>
            <Button onClick={()=>handlemodaldelete()} sx={{background:'red'}}>Yes, Delete</Button>
        </div>
      
    </Dialog>



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


        <div
            style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'2%',
            marginBottom:'2%'
            
        }}
        >
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3">All Tickets</Typography>
                </Grid>
                
                <Grid item>
                    {expanded ? (
                        <Button onClick={() => handleExpandAllClick(false)} variant="contained" startIcon={<UnfoldLess />}>
                            Collapse All
                        </Button>
                        ) : (
                        <Button onClick={() => handleExpandAllClick(true)} variant="contained" startIcon={<Expand />}>
                            Expand All
                        </Button>
                    )}
                </Grid>
            </Grid>
        </div>    

        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'2%',
            marginBottom:'2%'            
        }}>
            <Paper
                component="form"
                onSubmit={(e)=> handleSearch(e)}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >                
                <InputBase value={searchTicket} onChange={(e)=>setSearchTicket(e.target.value)} 
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Ticket with Ticket Id"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                
            </Paper>
        </div>


        <Grid container spacing={1}>
            {tickets.map((ticket, index) => (
                <Grid item key={index} xs={12}>
                    
                    {expandList[index] === 0 ? (
                        <div style={{ color: '#ffffff' }}>                    
                            <Card sx={{ minWidth: 275, }} >
                                <CardContent sx={{ minWidth: 275, cursor:'pointer' }} onClick={()=> handlecardclick(index)}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Id: {ticket.id}
                                    </Typography>

                                    <Typography variant="h5" component="div">
                                        Message Id: {ticket.msg_id}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Status: <span style={{ color: 'green' }}>{ticket.status}</span>
                                    </Typography>
                                    
                                    <Typography variant="body2">
                                        {ticket.timestamp}
                                    </Typography>
                                    
                                </CardContent>

                                <CardActions>
                                    <Button onClick={()=>handleexpandclick(index)} size="small">Expand</Button>
                                </CardActions>
                            </Card>
                        </div>
                        ) : (
                        <div style={{ color: '#ffffff' }}>                    
                            <Card sx={{ minWidth: 275,}}>
                                <CardContent sx={{ minWidth: 275, cursor:'pointer' }} onClick={()=> handlecardclick(index)}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Id: {ticket.id}
                                    </Typography>

                                    <Typography variant="h5" component="div">
                                        Message Id: {ticket.msg_id}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Status: <span style={{ color: 'green' }}>{ticket.status}</span>
                                    </Typography>
                                    
                                    <Typography variant="body2">
                                        {ticket.timestamp}
                                    </Typography>

                                    <Paper elevation={3} style={{ marginTop: '1%', padding: '1%' }}>
                                        <Grid container spacing={0}>
                                            <Typography variant="body2" gutterBottom>
                                            Context Message Ids:
                                            </Typography>
                                            {ticket.context_messages.map((message, id) => (
                                            <Grid item key={id} xs={12}>
                                                <Typography variant="body2">
                                                {message}
                                                </Typography>
                                            </Grid>
                                            ))}
                                        </Grid>
                                    </Paper>
                                    

                                </CardContent>

                                <CardActions>
                                    <Grid sx={{marginTop:'2%'}} container justifyContent="space-between" alignItems="center"> 
                                        <Grid item xs={6}>
                                            <Button onClick={()=>handleexpandclick(index)} size="small">Collapse</Button>
                                        </Grid>

                                        <Grid item xs={6} sx={{ textAlign: 'right' }}> 
                                            <Button onClick={()=> deletehandler(index)} sx={{background: 'red'}}>
                                                Delete Data
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </div>
                    )}
                </Grid>
            ))}
        </Grid>

        <div style={{marginTop:'2%'}}>
            <Button disabled={tickets.length == 1 || tickets.length == 0} onClick={()=>handlebuttonclick()}>Load More</Button>
        </div>
    </div>
  )
}

export default index