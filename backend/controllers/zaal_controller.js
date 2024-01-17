const prisma = require("../config/prisma_db");

const zaalController = {
  getAllZalen: async (req, res) => {
    try {
      const zalen = await prisma.zaal.findMany();
      res.json(zalen);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  getZaalById: async (req, res) => {
    const { id } = req.params;
    try {
      const zaal = await prisma.zaal.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!zaal) {
        return res.status(404).send("Zaal niet gevonden.");
      }

      res.json(zaal);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  createZaal: async (req, res) => {
    try {
      const newZaal = req.body;
      const zaal = await prisma.zaal.create({
        data: newZaal,
      });

      res.status(201).json(zaal);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  updateZaal: async (req, res) => {
    const { id } = req.params;
    const updatedZaalData = req.body;

    try {
      const updatedZaal = await prisma.zaal.update({
        where: {
          id: parseInt(id),
        },
        data: updatedZaalData,
      });

      res.json(updatedZaal);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  deleteZaal: async (req, res) => {
    const { id } = req.params;
    
    try {
      await prisma.zaal.delete({
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

module.exports = zaalController;
