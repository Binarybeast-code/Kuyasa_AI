const Tickets = artifacts.require("Tickets");
const assert = artifacts.require("assert");


contract('Tickets', (accounts) => {
  
    const  BUYER = accounts[1];
    const TICKET_ID = 0;

    it('should allow a user to buy a ticket,', async()=>{

      const instance = await Tickets.deployed();
      const originalTicket =await instance.tickets(
        TICKET_ID
        );

        await instance.buyTickets(TICKET_ID, {
            from: BUYER,
            value: originalTicket.price,
        })
        const updatedTickets = await instance.tickets(
            TICKET_ID
        );
        assert.equal(updatedTickets.owner ,BUYER ,'the should now own the ticket'
        );

    });

})