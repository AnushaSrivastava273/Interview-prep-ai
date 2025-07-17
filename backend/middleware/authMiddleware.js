const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("Protect middleware started");

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified:", decoded.id);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User found:", req.user ? req.user._id : "No user");

      next();
    } else {
      console.log("No token found");
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.log("Protect middleware error:", error.message);
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

module.exports = { protect };
