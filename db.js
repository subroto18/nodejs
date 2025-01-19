const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
