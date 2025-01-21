const express = require("express");
const {
  getUser,
  deleteUser,
  updateUser,
  signup,
  login,
} = require("../controllers/user.controller");

const { verifyJWTToken } = require("../middleware/auth.middleware");

const router = express.Router();

// user route
router.post("/signup", signup);
router.post("/login", login);

// protected route

router.get("/", verifyJWTToken, getUser);
router.delete("/", verifyJWTToken, deleteUser);
router.put("/", verifyJWTToken, updateUser);

module.exports = router;
