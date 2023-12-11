import json
from typing import Optional, List


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][:limit]
    
    def get_sub_tickets(self, start: Optional[int] = None) -> list[dict]:
        return self.data["tickets"][start:start+20]

    def get_ticket_by_id(self, ticket_id: int, tickets: list[dict]):        
        for ticket in tickets:
            if ticket["id"]==ticket_id:
                return ticket        
        return None    

    def delete_ticket_with_index(self, index, tickets):
        if 0 <= index < len(tickets):
            del tickets[index]
            return tickets
        else:
            raise IndexError("Ticket index not found")
