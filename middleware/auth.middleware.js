const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const verifyJWTToken = async (req, res, next) => {
  const tokenFromHeader = req.headers.authorization?.split(" ")?.[1];

  const tokenFromCookie = req.cookies?.token; // Extract the token from cookies

  if (!tokenFromCookie && !tokenFromHeader)
    return res.status(401).json({ message: "Unauthorized" });

  const token = tokenFromCookie ? tokenFromCookie : tokenFromHeader;

  try {
    const decoded_data = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decoded_data?.id).select("-password");

    if (userData) {
      req.user = userData;
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Invalid token",
    });
  }

  next();
};

const generateJWTToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

module.exports = { verifyJWTToken, generateJWTToken };
