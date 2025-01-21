const express = require("express");
const { createTask } = require("../controllers/task.controller");

const router = express.Router();

// user route
router.post("/", createTask);
// router.get("/", getAllProject);
// router.put("/", updateProject);
// router.delete("/", deleteProject);
module.exports = router;
