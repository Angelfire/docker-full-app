const jwt = require("jsonwebtoken");

const accessSecretKey = process.env.ACCESS_SECRET_KEY;

const generateAccessToken = (user, expiresIn) => {
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
    expiresIn: expiresIn || "1h",
  };

  const token = jwt.sign(payload, accessSecretKey, options);

  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error(
        "Invalid authorization header format. Expected: Bearer <token>"
      );
    }

    // Extract the token from the header
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, accessSecretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token." });
      }

      req.payload = decoded;

      next();
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = { generateAccessToken, verifyToken };
