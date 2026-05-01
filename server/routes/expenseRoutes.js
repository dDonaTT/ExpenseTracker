import express from "express";
import {
  addExpense,
  deleteExpense,
  downloadExpenseData,
  getAllExpenses,
  getExpenseOverview,
  updateExpense,
} from "../controllers/expenseController.js";
import authMiddleware from "../middleware/auth.js";

const expenseRoutes = express.Router();

expenseRoutes.get("/get", authMiddleware, getAllExpenses);
expenseRoutes.post("/add", authMiddleware, addExpense);

expenseRoutes.put("/:id", authMiddleware, updateExpense);
expenseRoutes.get("/downloadexcel", authMiddleware, downloadExpenseData);

expenseRoutes.delete("/:id", authMiddleware, deleteExpense);
expenseRoutes.get("/overview", authMiddleware, getExpenseOverview);

export default expenseRoutes;
