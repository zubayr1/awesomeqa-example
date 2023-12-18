import React from 'react'
import { Grid, Card, CardContent, Typography, CardActions, Button, Paper } from '@mui/material';

const ticketbody = ({
    ticket,
    index,
    expandList,
    handlecardclick,
    handleexpandclick,
    deletehandler,
    searchedTicketValid,
  }) => {
    return (
      <Grid item xs={12}>
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
                            {
                                <Button disabled={!searchedTicketValid} onClick={()=> deletehandler(index)} sx={{background: 'red'}}>
                                    Delete Data
                                </Button>
                            }
                                
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </div>
        )}
      </Grid>
    );
  };

export default ticketbody