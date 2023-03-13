const {
  users
} = require("../controllers/users");

const express = require("express");
const router = express.Router();

router.get("/users", users.getUsers);
router.get("/users/:id", users.getUserById);
router.post("/users", saveUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
