const express = require("express");
const router = express.Router();
const voorstellingController = require("../controllers/voorstelling_controller");

router.get("/", voorstellingController.getAllVoorstellingen);
router.get("/:id", voorstellingController.getVoorstellingById);
router.post("/", voorstellingController.createVoorstelling);
router.put("/:id", voorstellingController.updateVoorstelling);
router.delete("/:id", voorstellingController.deleteVoorstelling);

module.exports = router;