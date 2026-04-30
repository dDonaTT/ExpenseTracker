import express from "express";
import {
  updateIncome,
  deleteIncome,
  addIncome,
  getAllIncomes,
  donwnloadIncomeExcel,
  getIncomeOverview,
} from "../controllers/incomeController.js";
import authMiddleware from "../middleware/auth.js";

const incomeRoutes = express.Router();

incomeRoutes.get("/get", authMiddleware, getAllIncomes);
incomeRoutes.post("/add", authMiddleware, addIncome);
incomeRoutes.put("/:id", authMiddleware, updateIncome);
incomeRoutes.delete("/:id", authMiddleware, deleteIncome);
incomeRoutes.get("/downloadexcel", authMiddleware, donwnloadIncomeExcel);
incomeRoutes.get("/overview", authMiddleware, getIncomeOverview);

export default incomeRoutes;
