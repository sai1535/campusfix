import { Router } from "express";
import {
  createIssueController,
  listIssues,
  updateStatus,
  voteIssue,
} from "../controllers/issueController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/info", (_req, res) => {
  res.json({
    message: "Issue endpoints",
    endpoints: {
      list: "GET /api/issues (requires authentication)",
      create: "POST /api/issues (requires authentication)",
      updateStatus: "PATCH /api/issues/:id/status (requires admin authentication)",
      vote: "POST /api/issues/:id/vote (requires authentication)",
    },
    note: "These endpoints require a valid JWT token in the Authorization header",
  });
});

router.get("/", authenticate(), listIssues);
router.post("/", authenticate(), createIssueController);
router.patch("/:id/status", authenticate(["admin"]), updateStatus);
router.post("/:id/vote", authenticate(), voteIssue);

export default router;


