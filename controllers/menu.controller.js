const Menu = require("../models/menu.model");

const createMenu = async (req, res) => {
  try {
    let menuData = req.body;
    const menu = new Menu(menuData);
    const response = await menu.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong while creating menu");
  }
};

const getMenu = async (req, res) => {
  try {
    const response = await Menu.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("Something went wrong while fetching menu data");
  }
};

const updateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const response = await Menu.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).send("Invalid id");
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Something went wrong while updating menu");
  }
};

const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Menu.findByIdAndDelete(id);
    if (!response) {
      res.status(404).send("Invalid id");
    }
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).send("Something went wrong while deleting menu");
  }
};

module.exports = { createMenu, getMenu, updateMenu, deleteMenu };
