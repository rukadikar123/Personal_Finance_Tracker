import { User } from "../model/User.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller to register a new user

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all required fields are provided
    if (
      [name, email, password].some(
        (item) => typeof item !== "string" || item.trim().length === 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // Check if user already exists
    const isUserExisted = await User.findOne({ email });

    if (isUserExisted) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    // Hash the password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });

    // Set token in HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      user,
      message: "User Registerd successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `signUp: ${error.message}`,
    });
  }
};

//Controller to login an existing user
export const login = async (req, res) => {
  try {
    // Validate fields
    const { email, password } = req.body;
    if (
      [email, password].some(
        (item) => typeof item !== "string" || item.trim().length === 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // Check if user exists
    let userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare password with hashed password in DB
    let comparedPassword = await bcrypt.compare(password, userExist.password);
    if (!comparedPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    userExist.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User loggedIn successfully",
      user: userExist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `login: ${error.message}`,
    });
  }
};

// Controller to get the currently logged-in user's info
export const getCurrentUser = async (req, res) => {
  try {
    let user = req.user; // populated from auth middleware

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfulyy",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `getCurrentUser: ${error.message}`,
    });
  }
};

//  Controller to logout the current user
export const logout = async (req, res) => {
  try {
    // Clear JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `logout: ${error.message}`,
    });
  }
};
