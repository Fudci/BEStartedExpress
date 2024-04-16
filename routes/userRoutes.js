const {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const express = require("express");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.get("/users", authorization, getUsers);
router.get("/users/:id", getUserById);
router.post("/users", saveUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
