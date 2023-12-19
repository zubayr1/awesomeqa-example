import React, {useState, useEffect} from 'react'

import Profile from '../../components/userprofile/profile';
import ProfileModal from '../../components/Modals/ProfileModal';

import { Typography, Grid, Button } from '@mui/material';
import ProfileStat from '../../components/userprofile/ProfileStat';

import BlockIcon from '@mui/icons-material/Block';

import { useRouter } from 'next/router';


function index() {

  const router = useRouter();

  let [author_id, setAuthor_id] = useState<string | null>(null);

  const [open, setOpen] = React.useState(false);


  useEffect(() => {   
    let author_id = localStorage.getItem('author_id');

    const currentPath = router.asPath;

    const id = currentPath.replace('/profile?author=%22', '').replace('%22', '');

    if(id!==null && id!==undefined)
    {
      setAuthor_id(id);
    }
    else
    {
      setAuthor_id(author_id);  
    }
    
  }, []);

  const handleClick = () => {
    setOpen(true);
  };


  const handlemodaldelete = async () =>
  {   
    try {
        const _ = await fetch(`http://localhost:5001/ban_user/${author_id}`, {
        method: 'DELETE',
        });
    
        router.push('/ticketspage');
        
    } catch (error) {
        console.error('Error banning user:', error);
    }
           
    
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

    <ProfileModal
        handleClose={handleClose}
        open={open}
        handleModalDelete={handlemodaldelete}
      />


        <Profile author_id={author_id}/>

        
        <div style={{marginTop:'2%'}}>
            <Grid sx={{ marginTop: '2%' }} container justifyContent="space-between" alignItems="center">
                <Grid item xs={6}>
                    <Typography sx={{marginTop:'6%'}} variant='h5'>Stats</Typography>

                </Grid>

                <Grid item xs={6}>
                    <ProfileStat author_id={author_id}/>

                </Grid>
            </Grid> 
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6%' }}>
            <Button
                variant="contained"
                color="error" 
                startIcon={<BlockIcon />} 
                onClick={handleClick} 
                >
                Ban User
            </Button>
            
        </div>
    </div>
  )
}

export default index