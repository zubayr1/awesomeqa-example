import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupportAgent from '@mui/icons-material/SupportAgent';
import Lightbulb from '@mui/icons-material/Lightbulb';

import { useRouter } from 'next/router';

const Home: NextPage = () => 
{
  const router = useRouter();

  const handleClick = async (value) => {
    if (value==="tickets")
    {
      router.push('/ticketspage');
    }
    else
    {
      console.log(`clicked ${value}`);
    }
    
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>

          <Grid item xs={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => handleClick('knowledgebase')}
                sx={{background: 'linear-gradient(0deg, #1C1C1F, #1C1C1F), linear-gradient(0deg, #302F36, #302F36)', 
                border: '1px solid #302F36',
                height: "auto",
                color:'#F7F8F8', fontFamily: 'Roboto, sans-serif', padding: '8px 12px', 
                '@media (max-width:600px)': {
                  width: "90%", 
                },
                '@media (min-width:601px) and (max-width:1024px)': {
                  width: "70%", 
                },
                '@media (min-width:1025px)': {
                  width: "60%", 
                },
              }}
              >
                <Grid container direction="column" alignItems="start" spacing={1}>
                  <Grid item>
                    <Box                      
                      sx={{ display: "flex", justifyContent: "center", padding:".25rem", 
                      backgroundColor: '#5D50C34D', backfaceVisibility:'30%', borderRadius:'.2rem' }}
                    >
                      <LibraryBooksIcon />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography  sx={{ textTransform: 'none', color:'#F7F8F8',
                      '@media (max-width:600px)': {
                        fontSize: ".7rem", 
                      },
                      '@media (min-width:601px) and (max-width:1024px)': {
                        fontSize: ".9rem",  
                      },
                      '@media (min-width:1025px)': {
                        fontSize: "1rem", 
                      }                  
                  }}>
                      Knowledge Base
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Box>
          </Grid>
        
          <Grid item xs={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => handleClick('tickets')}
                sx={{background: 'linear-gradient(0deg, #1C1C1F, #1C1C1F), linear-gradient(0deg, #302F36, #302F36)', 
                border: '1px solid #302F36',
                height: "auto",
                color:'#F7F8F8', fontFamily: 'Roboto, sans-serif', padding: '8px 12px', 
                '@media (max-width:600px)': {
                  width: "90%", 
                },
                '@media (min-width:601px) and (max-width:1024px)': {
                  width: "70%", 
                },
                '@media (min-width:1025px)': {
                  width: "60%", 
                },
              }}
              >
                <Grid container direction="column" alignItems="start" spacing={1}>
                  <Grid item>
                    <Box                      
                      sx={{ display: "flex", justifyContent: "center", padding:".25rem", 
                      backgroundColor: '#5D50C34D', backfaceVisibility:'30%', borderRadius:'.2rem' 
                    }}
                    >
                      <SupportAgent />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography  sx={{ textTransform: 'none', color:'#F7F8F8',
                      '@media (max-width:600px)': {
                        fontSize: ".7rem", 
                      },
                      '@media (min-width:601px) and (max-width:1024px)': {
                        fontSize: ".9rem",  
                      },
                      '@media (min-width:1025px)': {
                        fontSize: "1rem", 
                      } 
                    }}>
                      Tickets
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Box>
          </Grid>


          <Grid item xs={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => handleClick('faq')}
                sx={{background: 'linear-gradient(0deg, #1C1C1F, #1C1C1F), linear-gradient(0deg, #302F36, #302F36)', 
                border: '1px solid #302F36',
                height: "auto",
                color:'#F7F8F8', fontFamily: 'Roboto, sans-serif', padding: '8px 12px', 
                '@media (max-width:600px)': {
                  width: "90%", 
                },
                '@media (min-width:601px) and (max-width:1024px)': {
                  width: "70%", 
                },
                '@media (min-width:1025px)': {
                  width: "60%", 
                },  
              }}
              >
                <Grid container direction="column" alignItems="start" spacing={1}>
                  <Grid item>
                    <Box                      
                      sx={{ display: "flex", justifyContent: "center", padding:".25rem", 
                      backgroundColor: '#5D50C34D', backfaceVisibility:'30%', borderRadius:'.2rem' }}
                    >
                      <Lightbulb />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography  sx={{ textTransform: 'none', color:'#F7F8F8',
                      '@media (max-width:600px)': {
                        fontSize: ".7rem", 
                      },
                      '@media (min-width:601px) and (max-width:1024px)': {
                        fontSize: ".9rem",  
                      },
                      '@media (min-width:1025px)': {
                        fontSize: "1rem", 
                      }  
                    }}>
                      FAQ Insights
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Box>
          </Grid>
      
        </Grid>
      </Box>
    </>
  );
};

export default Home;
