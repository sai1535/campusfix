import type { Request, Response } from "express";
import { Types } from "mongoose";
import { Issue } from "../models/Issue";
import { Vote } from "../models/Vote";
import { IssueStatus } from "../types/issue";

export const getUserDashboard = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const totals = await Issue.aggregate([
    { $match: { createdBy: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const response = {
    raised: totals.reduce((sum, t) => sum + t.count, 0),
    resolved:
      totals.find((t) => t._id === IssueStatus.Completed)?.count ?? 0,
    pending:
      totals.find((t) => t._id === IssueStatus.InProgress)?.count ?? 0,
  };

  res.json(response);
};

export const getAdminDashboard = async (_req: Request, res: Response) => {
  const [total, pending, inProgress, completed, votes] = await Promise.all([
    Issue.countDocuments(),
    Issue.countDocuments({ status: IssueStatus.NotStarted }),
    Issue.countDocuments({ status: IssueStatus.InProgress }),
    Issue.countDocuments({ status: IssueStatus.Completed }),
    Vote.countDocuments(),
  ]);

  res.json({ total, pending, inProgress, completed, votes });
};


