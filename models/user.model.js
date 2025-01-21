const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ], // Email validation regex pattern
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"], // Enforcing a minimum length of 6
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    if (!userPassword) return false;

    const passwordString = String(userPassword);

    const isPasswordMatch = await bcrypt.compare(passwordString, this.password);

    return isPasswordMatch;
  } catch (error) {
    throw error;
  }
};

// Add a transform to remove sensitive fields
// userSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password; // Exclude password
//     return ret;
//   },
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
