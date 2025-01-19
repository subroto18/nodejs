const express = require("express");
const {
  createMenu,
  getMenu,
  deleteMenu,
  updateMenu,
} = require("../controllers/menu.controller");

const router = express.Router();

// user route
router.post("/", createMenu);
router.get("/", getMenu);
router.delete("/:id", deleteMenu);
router.put("/:id", updateMenu);

module.exports = router;
