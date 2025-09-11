import { Router } from "express";
import { login, logout, signUp } from "../controller/User.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router=Router()

router.post("/signUp",signUp)
router.post("/login",login)
router.get("/logout",isAuthenticated ,logout)


export default router