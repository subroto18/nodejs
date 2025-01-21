const { generateJWTToken } = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // if[name,email,password] any of these or present
    if (!name || !email || !password) {
      res.status(400).json({
        message: "Name email and password are mendatory",
      });
    }

    // check if user already exist do not create user with same email
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist?.email) {
      res.status(400).json({
        message: "User already exist",
      });
    }

    // if everything good, create new user
    const user = new User({ name, email, password });
    const userData = await user.save();

    if (userData) {
      await generateTokenAndSetIntoCookie(userData, res); // generate token and set it into cookie for api authorization
      return res.send(201, "User registered successfully"); // Ensure only one response
    } else {
      return res.status(400).json({
        message: "Something went wrong while user signing up",
      });
    }
  } catch (error) {
    return res.status(500).send("Something went wrong while creating user");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({
        message: "Email and password are mendatory",
      });
    }

    // check if user present in the db or not
    const user = await User.findOne({
      email: email,
    });

    if (!user?.email) {
      return res.status(401).json({
        message: "Invalid email!",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (isPasswordMatch) {
      await generateTokenAndSetIntoCookie(user, res); // generate token and set it into cookie for api authorization

      return res.json({
        message: "User login successfully",
      }); // Ensure only one response
    } else {
      return res.status(401).json({
        message: "Invalid password!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while login",
    });
  }
};

const getUser = async (req, res) => {
  try {
    //loggedInUser

    return res.status(200).json(req.user);

    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("Something went wrong while fetching user data");
  }
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

const generateTokenAndSetIntoCookie = async (userData, res) => {
  // token generate

  const payload = {
    id: userData._id,
    email: userData.email,
  };
  const token = await generateJWTToken(payload); // generate token and set it into cookie

  // set token into cookie for authorization

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: process.env.TOKEN_COOKIE_MAX_AGE, // 1 hour
  });
};

module.exports = { signup, login, getUser, updateUser, deleteUser };
