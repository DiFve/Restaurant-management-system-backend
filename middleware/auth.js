require("dotenv").config;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = //req.headers.authorization;
    req.body.token || req.query.token || req.headers["x-access-token"];
  //return next();
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
  }

  return next();
};

module.exports = verifyToken;
