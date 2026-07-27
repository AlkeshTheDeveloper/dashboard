const bcrypt = require("bcryptjs");
const User = require("./auth.model");
const AUTH_MESSAGES = require("./auth.constants");
const jwt = require("../../utils/jwt");
const ApiError = require("../../utils/ApiError");

const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, AUTH_MESSAGES.USER_EXISTS);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.generateToken({
    id: user._id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};
