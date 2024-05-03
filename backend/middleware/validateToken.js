const jwt = require("jsonwebtoken");

const validateUserToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ success: false, error: "User is not authorized" });
        }
        req.user = decoded.user; // Set req.user to decoded payload
        next(); // Call next middleware
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "User is not authorized or token is missing",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error while validating token",
    });
  }
};

module.exports = {validateUserToken};