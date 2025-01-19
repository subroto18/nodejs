const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user.router");
const menuRouter = require("./routers/menu.router");

// parse application/json
app.use(bodyParser.json());

// user route
app.use("/user", userRouter);

// menu route
app.use("/menu", menuRouter);

// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

app.listen(PORT, () => {
  console.log("Server is listening port : ", PORT);
});
