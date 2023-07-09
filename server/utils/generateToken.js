const jwt = require("jsonwebtoken");
const {jwtCredentials} = require('../config/index')

const {jwtSecret} = jwtCredentials

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "1000ms",
  });
};

module.exports = generateToken;
