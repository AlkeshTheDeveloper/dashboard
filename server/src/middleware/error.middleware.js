const HTTP_STATUS = require("../constants/httpStatus");

const errorHandler = (err, req, res, next) => {

    console.error(err);

    res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
    });

};

module.exports = errorHandler;