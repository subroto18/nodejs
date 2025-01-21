const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Completed"],
      default: "To-Do",
    },
    deadline: {
      type: Date,
      required: [true, "Task deadline is required"],
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming a User schema exists
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Reference to the Project schema
      required: [true, "Project ID is required"],
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Export the model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
