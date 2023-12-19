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



@app.get("/all_tickets/{start}/{end}")
async def get_all_tickets(
    start:int,
    end:int,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_sub_tickets(start, end)
    return JSONResponse(tickets, status_code=200)



@app.get("/get_ticket_by_id/{id}")
async def get_ticket_by_id(
    id:str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    (ticket, count) = ticket_repository.get_ticket_by_id(id)

    if ticket:
        return JSONResponse(([ticket], count), status_code=200)
    return JSONResponse([], status_code=200)



@app.delete("/delete_ticket/{index}")
async def delete_ticket(
    index: int):
    updated_tickets = ticket_repository.delete_ticket_with_index(index)
    return updated_tickets


@app.delete("/delete_message/{msg_id}")
async def delete_message(
    msg_id: int):
    ticket_repository.delete_ticket_with_msg_id(msg_id)

    messages = message_repository.get_messages()

    message_repository.delete_message_with_id(msg_id, messages)
    return JSONResponse("deletion successfully", status_code=200)


@app.delete("/ban_user/{msg_id}")
async def ban_user(
    msg_id: int):
    messages = message_repository.get_messages()

    banned_ids = message_repository.delete_message_of_banned_user(msg_id, messages)
    for id in banned_ids:
        ticket_repository.delete_ticket_with_msg_id(id)
    
    return JSONResponse("deletion successfully", status_code=200)



@app.get("/get_message_by_id/{msg_id}")
async def get_message_by_id(
    msg_id: str):
    messages = message_repository.get_messages()
    message = message_repository.get_message_with_id(msg_id, messages)
    if messages:
        return JSONResponse(message, status_code=200)
    return JSONResponse(None, status_code=200)



@app.get("/get_all_message_count_by_id/{msg_id}")
async def get_all_message_count_by_id(
    msg_id: str):
    messages = message_repository.get_messages()
    count = message_repository.get_all_message_count_by_id(msg_id, messages)
    if count:
        return JSONResponse((count, len(messages)), status_code=200)
    return JSONResponse((0, len(messages)), status_code=200)



@app.get("/get_message/{ticket_id}")
async def get_message(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
    message_repository: MessageRepository = Depends(lambda: message_repository),
):
       
    (ticket, _) = ticket_repository.get_ticket_by_id(ticket_id)

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
