# Awesome ticket challenge

### Backend

Steps to setup the backend environment:

1. [Download the ticket data here](https://drive.google.com/file/d/1Bvk2mW5t3GfkqTkpURiFpaLuqrUckzUX/view?usp=sharing)
2. Place it in data/awesome_tickets.json
3. Run `make setup`
4. Run `make run`
5. Try it by calling [http://localhost:5001/tickets](http://localhost:5001/tickets)

More information on Backend:

1. /tickets: Get all tickets within a limit.
2. /all_tickets/{start}/{end}: Get all tickets within a range of starting point and ending point.
3. /get_ticket_by_id/{id}: Get a ticket by its id.
4. /delete_ticket/{index}: Get a ticket at index: index.
5. /get_message/{ticket_id}: Get message corresponding to a ticket id.
6. DELETED_IDS: Stores the ids of the deleted tickets.
7. /get_all_message_count_by_id/{msg_id}: Get number of messages by an author
8. /ban_user/{msg_id}: Ban an author.

### Frontend

1. Run `make setup`
2. Run `make run`
3. Open it: [http://localhost:3002](http://localhost:3002)

More information on Frontend:

1. /ticketspage: Page displaying all tickets (filtering 20 tickets at a time).
2. /messagePage: Page displaying message corresponding to a ticket.
3. /profile: Page displaying profile corresponding to an author.

### Happy coding 🎉
