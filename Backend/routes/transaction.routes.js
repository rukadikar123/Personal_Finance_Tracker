import { Router } from "express";
import { getListOfTransactions,getTransaction,addTransactions,updateTransaction,deleteTransaction } from "../controller/Transaction.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router=Router()

router.get("/",isAuthenticated, getListOfTransactions)
router.get("/:id",isAuthenticated, getTransaction)
router.post("/add",isAuthenticated,addTransactions)
router.patch("/:id",isAuthenticated,updateTransaction)
router.delete("/:id",isAuthenticated,deleteTransaction)



export default router