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
        # tickets = self.TICKETS[start:end]
        # self.START = start
        self.END = end
        return tickets

    def get_ticket_by_id(self, ticket_id: str):  
        count=0      
        for ticket in self.TICKETS:
            if len(ticket_id)==19:
                if ticket["msg_id"]==ticket_id and ticket["id"] not in self.DELETED_IDS:
                    return (ticket, count)
            else:
                if ticket["id"]==ticket_id and ticket["id"] not in self.DELETED_IDS:
                    return (ticket, count)    
            count+=1    
        return (None, None)    

    def delete_ticket_with_index(self, index):
        if 0 <= index < len(self.TICKETS):
            deleted_ticket = self.TICKETS.pop(index)
            self.DELETED_IDS.append(deleted_ticket["id"])

            if index <self.END:
                self.END = self.END - 1
            return self.TICKETS[self.START:self.END]
        else:
            raise IndexError("Ticket index not found")
        


    def delete_ticket_with_msg_id(self, msg_id):
        index=0
        for ticket in self.TICKETS:
            if str(ticket["msg_id"])==str(msg_id):
                deleted_ticket = self.TICKETS.pop(index)
                self.DELETED_IDS.append(deleted_ticket["id"])
                return 
            
            index+=1
        return 
