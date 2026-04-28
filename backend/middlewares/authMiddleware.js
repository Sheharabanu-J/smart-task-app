const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;