import express from "express";
import authMiddleware from "../middleware/auth.js";
import { getDashboardOverview } from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", authMiddleware, getDashboardOverview);

export default dashboardRoutes;
