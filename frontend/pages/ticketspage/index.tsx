import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { Button, } from "@mui/material";

import TicketbodyMap from '../../components/TicketBody/TicketbodyMap'
import TicketBodyHeader from '../../components/TicketBody/TicketBodyHeader'
import TicketModal from '../../components/Modals/TicketModal';
import ScrollToTop from '../../components/ToTop/ScrollToTop';

import { Ticket } from '../../types/types';

import { useRouter } from 'next/router';



function index() {

    const router = useRouter();

    const [tickets, setTickets] = useState<Ticket[]>([]); 

    const [ticketcountstart, setTicketCountStart] = useState(0); 
    const [ticketcountend, setTicketCountEnd] = useState(20); 

    const [searchTicket, setSearchTicket] = useState(""); 
    const [searchedTicketValid, setSearchedTicketValid] = useState(true);


    const [expandList, setExpandList] = useState(Array.from({ length: 20 }, () => 0));

    const [expanded, setExpanded] = useState(false); 

    const [isVisible, setIsVisible] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [deleteIndex, setDeleteIndex] = useState(-1);


    const defaultTicket: Ticket = {id: "null", msg_id: "null", status: "null", resolved_by: "null", 
        ts_last_status_change: "null", timestamp: "null", context_messages: []};


        const fetchData = async (ticketcountstart: number, ticketcountend: number) => {
            try {
              const response = await fetch(`http://localhost:5001/all_tickets/${ticketcountstart}/${ticketcountend}`);
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
      
      setTicketCountStart(0);
      setTicketCountEnd(20);      
        
        fetchData(ticketcountstart, ticketcountend);
        
      }, []);


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5001/all_tickets/${ticketcountstart}/${ticketcountend}`);
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
    
        if (searchTicket==="")
        {
            setSearchedTicketValid(true);
            const length = expandList.length;
            const updatedList: number[] = Array(length).fill(0);
            setExpandList(updatedList)
            fetchData();
        }
        
        
      }, [searchTicket]);

      


      const handlebuttonclick =() =>
      {
        setTicketCountStart(ticketcountstart);            

        fetchData(ticketcountend, ticketcountend+20);

        setTicketCountEnd(ticketcountend+20); 
        
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
                  const result = await response.json();  
                  
                  const data = result[0];

                  const index = result[1];

                  setDeleteIndex(index)

                  if(data!==undefined)
                  {                    
                    setTickets(data); 
                  }
                  else
                  {
                    setSearchedTicketValid(false)
                    setTickets([defaultTicket])
                  }                            
                             
                } 
                else 
                {                  
                  setSearchedTicketValid(false)
                  setTickets([defaultTicket])
                }
            } catch (error) 
            {
              setSearchedTicketValid(false)
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
        if (searchTicket==="")
        {
          setDeleteIndex(index);
          setSearchedTicketValid(true);
        }
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
          
            setTicketCountEnd(updatedTickets.length);
            
            const updatedExpandList = [
                ...expandList.slice(0, deleteIndex),
                ...expandList.slice(deleteIndex + 1)
            ];
            updatedExpandList[0]=0;
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
    
    <TicketModal
      handleClose={handleClose}
      open={open}
      handleModalDelete={handlemodaldelete}
    />

    <ScrollToTop isVisible={isVisible} scrollToTop={scrollToTop} />


    <TicketBodyHeader
      expanded={expanded}
      handleExpandAllClick={handleExpandAllClick}
      handleSearch={handleSearch}
      searchTicket={searchTicket}
      setSearchTicket={setSearchTicket}
    />


    <Grid container spacing={1}>
        {tickets.map((ticket, index) => (
            <TicketbodyMap
            key={index}
            ticket={ticket}
            index={index}
            expandList={expandList}
            handlecardclick={handlecardclick}
            handleexpandclick={handleexpandclick}
            deletehandler={deletehandler}
            searchedTicketValid={searchedTicketValid}
          />
        ))}
    </Grid>

      <div style={{marginTop:'2%'}}>
          <Button disabled={tickets.length == 1 || tickets.length == 0} onClick={()=>handlebuttonclick()}>Load More</Button>
      </div>

    </div>
  )
}

export default index