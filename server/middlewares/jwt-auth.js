const jwt = require("jsonwebtoken");

const accessSecretKey = process.env.ACCESS_SECRET_KEY;

const generateAccessToken = (user) => {
  if (!user.id) {
    throw new Error("Missing required user data: id");
  }

  if (!accessSecretKey) {
    throw new Error("Missing environment variable: ACCESS_SECRET_KEY");
  }

  // Consider additional claims for better authorization logic (e.g., roles, permissions)
  const payload = {
    id: user.id,
    // ...other claims
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, accessSecretKey, options);

  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token is required." });
  }

  jwt.verify(token, accessSecretKey, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.payload = payload;

    next();
  });
};

module.exports = { generateAccessToken, verifyToken };
