from app.repositories.ticket_repository import TicketRepository
from app.repositories.message_repository import MessageRepository

import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TICKET_FILEPATH = "../data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)
message_repository = MessageRepository(filepath=TICKET_FILEPATH)

@app.get("/healthz")
async def root():
    return "OK"


@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets(limit)
    return JSONResponse(tickets, status_code=200)



@app.get("/all_tickets/{start}")
async def get_all_tickets(
    start:int,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_sub_tickets(start)
    return JSONResponse(tickets, status_code=200)



@app.get("/get_ticket_by_id/{id}")
async def get_ticket_by_id(
    id:str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets() 
    ticket = ticket_repository.get_ticket_by_id(id, tickets)
    if ticket:
        return JSONResponse([ticket], status_code=200)
    return JSONResponse([], status_code=200)



@app.delete("/delete_ticket/{index}")
async def delete_ticket(
    index: int):
    tickets = ticket_repository.get_tickets()  
    updated_tickets = ticket_repository.delete_ticket_with_index(index, tickets)
    return updated_tickets



@app.get("/get_message/{ticket_id}")
async def get_message(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
    message_repository: MessageRepository = Depends(lambda: message_repository),
):
    tickets = ticket_repository.get_tickets()    
    ticket = ticket_repository.get_ticket_by_id(ticket_id, tickets)

    if ticket:
        messages = message_repository.get_messages()
        message = message_repository.get_message(ticket["msg_id"], messages)

        if message:
            return JSONResponse(message, status_code=200)
        raise HTTPException(status_code=404, detail="Ticket found but corresponding message not found") 
    else:
        raise HTTPException(status_code=404, detail="Ticket not found")


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)
