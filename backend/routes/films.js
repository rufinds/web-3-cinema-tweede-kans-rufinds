const express = require("express");
const router = express.Router();
const filmController = require("../controllers/film_controller");

router.get("/", filmController.getAllFilms);
router.get("/:id", filmController.getFilmById);
router.post("/", filmController.createFilm);
router.put("/:id", filmController.updateFilm);
router.delete("/:id", filmController.deleteFilm);
router.get("/genre/:genre", filmController.getFilmByGenre);
router.get("/titel/:titel", filmController.getFilmByTitel);

module.exports = router;
