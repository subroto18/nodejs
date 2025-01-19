const express = require("express");
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

const router = express.Router();

// user route
router.post("/", createUser);
router.get("/", getUser);
router.delete("/", deleteUser);
router.put("/", updateUser);

module.exports = router;
