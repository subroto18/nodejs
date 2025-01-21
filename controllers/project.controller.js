const Project = require("../models/project.model");

const createProject = async (req, res) => {
  try {
    const { title, description, creationDate } = req.body;
    const projectOwner = req.user?.id;

    if (!projectOwner) {
      res.status(401).json({
        message: "Invalid token!",
      });
    }

    if (!title || !description || !creationDate) {
      res.status(400).json({
        message: "Title description and creationDate are mendatory!",
      });
    }

    const project = new Project({
      title,
      description,
      creationDate,
      projectOwner,
    });

    const projectData = await project.save();

    if (projectData) {
      res.status(200).json({
        message: "Project has been created successfully",
      });
    } else {
      res.status(400).json({
        message: "Something went wrong while creating project",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating project",
    });
  }
};

const getAllProject = async (req, res) => {
  try {
    const loggedInUser = req?.user?.id;

    const { page = 1, pageSize = 10 } = req.query; // Default to page 1 and 10 items per page

    const totalProjects = await Project.countDocuments({
      projectOwner: loggedInUser,
    });

    const projects = await Project.find({ projectOwner: loggedInUser })
      .skip((page - 1) * pageSize) // Skip projects of previous pages
      .limit(parseInt(pageSize)) // Limit to `pageSize` items
      .sort({ createdAt: -1 }); // Optional: Sort by creation date (most recent first)

    return res.status(200).json({
      totalProjects,
      currentPage: page,
      totalPages: Math.ceil(totalProjects / pageSize),
      pageSize,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching all project",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const loggedInUser = req?.user?.id;

    const { projectId } = req.query;

    // check project id is present in params or not
    if (!projectId) {
      res.status(400).json({
        message: "Project Id is mendatory in params!",
      });
    }

    const { title, description, creationDate } = req.body;

    if (!title && !description && !creationDate) {
      res.status(400).json({
        message: "Title description or creationDate is mendatory!",
      });
    }

    // Find the project by ID
    const project = await Project.findOne(projectId);

    res.send("yes");

    // Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the logged-in user is the project owner
    if (project.projectOwner.toString() !== loggedInUser) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this project" });
    }

    const updateData = { title, description, creationDate };

    // Proceed to update the project
    const updatedProject = await Project.findByIdAndUpdate(
      projectId, // ID of the project to update
      updateData, // Fields to update
      { new: true, runValidators: true } // Options: return the updated document and validate fields
    );
    res.status(200).json({
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching all project",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const loggedInUser = req?.user?.id;

    const { projectId } = req.query;

    // check project id is present in params or not
    if (!projectId) {
      res.status(400).json({
        message: "Project Id is mendatory in params!",
      });
    }

    // Find the project by ID
    const project = await Project.findOne(projectId);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project id is not valid" });
    }

    // Check if the logged-in user is the project owner
    if (project.projectOwner.toString() !== loggedInUser) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this project" });
    }

    // Proceed to update the project
    const deleteProject = await Project.findByIdAndDelete(projectId);
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while deleting project",
    });
  }
};

module.exports = { createProject, getAllProject, updateProject, deleteProject };
