const express = require("express");
const {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();

// user route
router.post("/", createProject);
router.get("/", getAllProject);
router.put("/", updateProject);
router.delete("/", deleteProject);
module.exports = router;
