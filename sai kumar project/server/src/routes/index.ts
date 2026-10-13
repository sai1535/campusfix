import { Router } from "express";
import authRoutes from "./authRoutes";
import issueRoutes from "./issueRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/issues", issueRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;


