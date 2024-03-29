const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);
router.get("/verify", userController.verify);

module.exports = router;
