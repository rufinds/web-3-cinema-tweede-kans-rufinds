const prisma = require("../config/prisma_db");

const filmController = {
  getAllFilms: async (req, res) => {
    try {
      const films = await prisma.film.findMany();
      res.json(films);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  getFilmById: async (req, res) => {
    const { id } = req.params;
    try {
      const film = await prisma.film.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!film) {
        return res.status(404).send("Film niet gevonden.");
      }

      res.json(film);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  createFilm: async (req, res) => {
    try {
      const newFilm = req.body;
      const film = await prisma.film.create({
        data: newFilm,
      });

      res.status(201).json(film);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  updateFilm: async (req, res) => {
    const { id } = req.params;
    const updatedFilmData = req.body;

    try {
      const updatedFilm = await prisma.film.update({
        where: {
          id: parseInt(id),
        },
        data: updatedFilmData,
      });

      res.json(updatedFilm);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  deleteFilm: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.film.delete({
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

  getFilmByGenre: async (req, res) => {
    const { genre } = req.params;
    try {
      const films = await prisma.film.findMany({
        where: {
          genres: {
            some: {
              naam: genre,
            },
          },
        },
      });

      res.json(films);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },

  getFilmByTitel: async (req, res) => {
    const { titel } = req.params;
    try {
      const films = await prisma.film.findMany({
        where: {
          titel: {
            contains: titel,
            mode: "insensitive",
          },
        },
      });

      res.json(films);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },
};

module.exports = filmController;
