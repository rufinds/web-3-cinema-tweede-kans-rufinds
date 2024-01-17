const prisma = require("../config/prisma_db");

const ticketController = {
  getAllTickets: async (req, res) => {
    try {
      const tickets = await prisma.ticket.findMany();
      res.json(tickets);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  getTicketById: async (req, res) => {
    const { id } = req.params;
    try {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!ticket) {
        return res.status(404).send("Ticket niet gevonden.");
      }

      res.json(ticket);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  createTicket: async (req, res) => {
    try {
      const newTicket = req.body;
      const ticket = await prisma.ticket.create({
        data: newTicket,
      });

      res.status(201).json(ticket);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  updateTicket: async (req, res) => {
    const { id } = req.params;
    const updatedTicketData = req.body;

    try {
      const updatedTicket = await prisma.ticket.update({
        where: {
          id: parseInt(id),
        },
        data: updatedTicketData,
      });

      res.json(updatedTicket);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  deleteTicket: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.ticket.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(204).send();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },
};

module.exports = ticketController;
