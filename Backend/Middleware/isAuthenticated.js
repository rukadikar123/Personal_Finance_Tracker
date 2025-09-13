import jwt from "jsonwebtoken";
import { User } from "../model/User.schema.js";

// Middleware to check if a user is authenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    let token = req?.cookies?.jwt; // Get the JWT token from cookies

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token, excluding the password
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not found",
      });
    }

    // Attach the user to req.user for downstream controllers
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid or expired token",
    });
  }
};
