const mongoose = require("mongoose");
const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    creationDate: {
      type: Date,
      default: Date.now, // Automatically sets the creation date to the current date
    },
    projectOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Project Owner is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
