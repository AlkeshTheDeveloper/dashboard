const { validationResult } = require("express-validator");

const asyncHandler = require("../../utils/asyncHandler");
const { registerUser } = require("./auth.service");
const { loginUser } = require("./auth.service");
const ApiResponse = require("../../utils/ApiResponse");
const HTTP_STATUS = require("../../constants/httpStatus");

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const user = await registerUser(req.body);
  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(HTTP_STATUS.CREATED, AUTH_MESSAGES.USER_CREATED, user),
    );
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const result = await loginUser(req.body);

  res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.json(new ApiResponse(200, "User fetched successfully", user));
});

module.exports = {
  register,
  login,
  getMe,
};
