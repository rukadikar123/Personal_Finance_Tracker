import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  signUp,
} from "../controller/User.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = Router();

router.post("/signUp", signUp); // POST register a new user
router.post("/login", login); // POST login an existing user
router.get("/getUser", isAuthenticated, getCurrentUser); // GET fetch currently logged-in user's info
router.get("/logout", isAuthenticated, logout); // GET logout the current user (clears cookie)

export default router;
