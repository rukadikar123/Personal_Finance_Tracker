import { Router } from "express";
import { getListOfTransactions,getTransaction,addTransactions,updateTransaction,deleteTransaction } from "../controller/Transaction.controller.js";

const router=Router()

router.get("/",getListOfTransactions)
router.get("/:id",getTransaction)
router.post("/add",addTransactions)
router.put("/:id",updateTransaction)
router.delete("/:id",deleteTransaction)



export default router