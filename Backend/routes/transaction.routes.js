import { Router } from "express";
import {
  getListOfTransactions,
  addTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controller/Transaction.controller.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = Router();

router.get("/", isAuthenticated, getListOfTransactions); // GET all transactions for logged-in user
router.post("/add", isAuthenticated, addTransactions); // POST a new transaction for logged-in user
router.patch("/:id", isAuthenticated, updateTransaction); // PATCH update a transaction by ID
router.delete("/:id", isAuthenticated, deleteTransaction); // DELETE a transaction by ID

export default router;
