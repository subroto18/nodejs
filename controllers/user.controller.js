const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    let userData = req.body;
    const user = new User(userData);
    const response = await user.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating user");
  }
};

const getUser = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("Something went wrong while fetching user data");
  }
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {};

module.exports = { createUser, getUser, updateUser, deleteUser };
