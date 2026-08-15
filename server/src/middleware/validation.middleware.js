const { validationResult } = require("express-validator");

const ApiError = require("../utils/ApiError");
const HTTP_STATUS = require("../constants/httpStatus");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Validation failed",
        errors.array(),
      ),
    );
  }

  next();
};

module.exports = validate;
