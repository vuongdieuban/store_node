const jwt = require("jsonwebtoken");
const config = require("config");

// Authorization (permission)
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided");

  // jwt.verify if successfully decode token, return a valid payload
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
