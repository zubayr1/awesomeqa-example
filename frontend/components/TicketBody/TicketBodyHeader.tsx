import React from 'react';
import { Grid, Typography, Button, Paper, InputBase, IconButton } from '@mui/material';
import { Expand, UnfoldLess, Search as SearchIcon } from '@mui/icons-material';

const TicketBodyHeader = ({ expanded, handleExpandAllClick, handleSearch, searchTicket, setSearchTicket }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
          marginBottom: '2%',
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
          marginBottom: '2%',
        }}
      >
        <Paper
          component="form"
          onSubmit={(e) => handleSearch(e)}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            value={searchTicket}
            onChange={(e) => setSearchTicket(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Ticket with Ticket Id or Message Id"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </>
  );
};

export default TicketBodyHeader;
