import { Router } from "express";
import { login, refreshToken, register } from "../controllers/authController";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Authentication endpoints",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      refresh: "POST /api/auth/refresh",
    },
  });
});

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;


