import json
from typing import Optional


class MessageRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_messages(self, limit: Optional[int] = None) -> list[dict]:
        return self.data["messages"][:limit]

    def get_message(self, ticket_id: int, messages: list[dict]) -> dict:
        ticket_id = str(ticket_id)
        for message in messages:
            if message["id"]==ticket_id:
                return message
        return None
    
    def delete_message_with_id(self, msg_id, messages):
        index=0
        for message in messages:
            if message["id"]==msg_id:
                del messages[index]
                return 
            
            index+=1
        return 
        
