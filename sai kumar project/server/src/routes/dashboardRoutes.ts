import { Router } from "express";
import {
  getAdminDashboard,
  getUserDashboard,
} from "../controllers/dashboardController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Dashboard endpoints",
    endpoints: {
      user: "GET /api/dashboard/user (requires authentication)",
      admin: "GET /api/dashboard/admin (requires admin authentication)",
    },
    note: "These endpoints require a valid JWT token in the Authorization header",
  });
});

router.get("/user", authenticate(), getUserDashboard);
router.get("/admin", authenticate(["admin"]), getAdminDashboard);

export default router;


