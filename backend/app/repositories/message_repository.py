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
    
    def get_message_with_id(self, msg_id, messages):
        for message in messages:
            if str(message["author_id"])==str(msg_id):
                
                return message
            
        return None
    

    def get_all_message_count_by_id(self, msg_id, messages):
        count=0
        for message in messages:
            if str(message["author_id"])==str(msg_id):                
                count+=1           
            
        return count
    
    def delete_message_with_id(self, msg_id, messages):
        index=0
        for message in messages:
            if message["id"]==msg_id:
                del messages[index]
                return 
            
            index+=1
        return 
        

    def delete_message_of_banned_user(self, msg_id, messages):
        banned_ids=[]
        index=0
        for message in messages:
            if str(message["author_id"])==str(msg_id):                
                banned_ids.append(str(message["id"])) 
                del messages[index]  
            index+=1
            
        return banned_ids
