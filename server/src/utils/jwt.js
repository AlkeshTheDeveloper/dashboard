const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

console.log("JWT_EXPIRES_IN:", JSON.stringify(process.env.JWT_EXPIRES_IN));

module.exports = {
  generateToken,
};
