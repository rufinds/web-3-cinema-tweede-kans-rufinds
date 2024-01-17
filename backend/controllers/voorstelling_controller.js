const prisma = require("../config/prisma_db");

const voorstellingController = {
  getAllVoorstellingen: async (req, res) => {
    try {
      const voorstellingen = await prisma.voorstelling.findMany();
      res.json(voorstellingen);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  getVoorstellingById: async (req, res) => {
    const { id } = req.params;
    try {
      const voorstelling = await prisma.voorstelling.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!voorstelling) {
        return res.status(404).send("Voorstelling niet gevonden.");
      }

      res.json(voorstelling);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  createVoorstelling: async (req, res) => {
    try {
      const newVoorstelling = req.body;
      const voorstelling = await prisma.voorstelling.create({
        data: newVoorstelling,
      });

      res.status(201).json(voorstelling);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  updateVoorstelling: async (req, res) => {
    const { id } = req.params;
    const updatedVoorstellingData = req.body;

    try {
      const updatedVoorstelling = await prisma.voorstelling.update({
        where: {
          id: parseInt(id),
        },
        data: updatedVoorstellingData,
      });

      res.json(updatedVoorstelling);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  deleteVoorstelling: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.voorstelling.delete({
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

module.exports = voorstellingController;
