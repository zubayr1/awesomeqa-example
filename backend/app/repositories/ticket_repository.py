import json
from typing import Optional, List


class TicketRepository:
    TICKETS = []
    START = 0
    END = 0
    DELETED_IDS = []

    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)
            self.TICKETS = self.data["tickets"]
            self.START = 0
            self.END = 20
            self.DELETED_IDS = []

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        tickets = self.TICKETS[:limit]
        return tickets
    
    def get_sub_tickets(self, start, end) -> list[dict]:
        count=start
        tickets = []
        while(True):
            if self.TICKETS[count]["id"] not in self.DELETED_IDS:
                tickets.append(self.TICKETS[count])
            count+=1
            if len(tickets)==(end - start):
                break
        tickets = self.TICKETS[start:end]
        # self.START = start
        self.END = end
        print(self.START, self.END, len(tickets))
        return tickets

    def get_ticket_by_id(self, ticket_id: int):        
        for ticket in self.TICKETS:
            if ticket["id"]==ticket_id:
                return ticket        
        return None    

    def delete_ticket_with_index(self, index):
        if 0 <= index < len(self.TICKETS):
            deleted_ticket = self.TICKETS.pop(index)
            self.DELETED_IDS.append(deleted_ticket["id"])
            self.END = self.END - 1
            return self.TICKETS[self.START:self.END]
        else:
            raise IndexError("Ticket index not found")
