const express = require("express");
const router = express.Router();
const zaalController = require("../controllers/zaal_controller");

router.get("/", zaalController.getAllZalen);
router.get("/:id", zaalController.getZaalById);
router.post("/", zaalController.createZaal);
router.put("/:id", zaalController.updateZaal);
router.delete("/:id", zaalController.deleteZaal);

module.exports = router;
