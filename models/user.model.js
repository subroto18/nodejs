const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    designation: {
      type: String,
      enum: ["chef", "waiter", "manager"],
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async (next) => {
  let user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isPasswordMatch = await bcrypt.compare(userPassword, this.password);
    return isPasswordMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
