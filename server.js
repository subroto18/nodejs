const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user.router");
const projectRouter = require("./routers/project.router");
const taskRouter = require("./routers/task.router");
const errorMiddleware = require("./middleware/error.middleware");
const { verifyJWTToken } = require("./middleware/auth.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logMiddleware = require("./middleware/log.middleware");

// Allow requests from the React frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// parse application/json
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

// user route
app.use("/api/user", userRouter);

// project route with protectedRouter
app.use("/api/project", verifyJWTToken, projectRouter);

// task route with protectedRouter
app.use("/api/task", verifyJWTToken, taskRouter);

// log api middleware

app.use(logMiddleware);

// Catch-all route for 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

// error handle
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is listening port : ", PORT);
});
