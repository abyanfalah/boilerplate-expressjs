const express = require("express");
const userController = require("../app/controller/userController");
const { isAdmin } = require("../app/middleware/authMiddleware");
const router = express.Router();

router.get("/", userController.listUser);
router.get("/:id", userController.getUser);

router.post("/", isAdmin, userController.createUser);
router.put("/:id", isAdmin, userController.updateUser);
router.delete("/:id", isAdmin, userController.deleteUser);

module.exports = router;
