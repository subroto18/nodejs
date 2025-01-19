const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => {
  console.log("Server is listening port : ", PORT);
});
