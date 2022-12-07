const express = require("express");
const userController = require("../app/controller/userController");
const router = express.Router();

router.get("/", userController.listUser);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
