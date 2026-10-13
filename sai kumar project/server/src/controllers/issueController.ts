import type { Request, Response } from "express";
import { Types } from "mongoose";
import { z } from "zod";
import { Issue } from "../models/Issue";
import { Vote } from "../models/Vote";
import { IssueCategory, IssuePriority, IssueStatus } from "../types/issue";
import { createIssue } from "../services/issueService";

const upsertSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    category: z.nativeEnum(IssueCategory).optional(),
    priority: z.nativeEnum(IssuePriority).optional(),
    location: z.string().optional(),
  }),
});

export const listIssues = async (req: Request, res: Response) => {
  const { status, category, search } = req.query;
  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const issues = await Issue.find(query)
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
  res.json(issues);
};

export const createIssueController = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parsed = upsertSchema.safeParse({ body: req.body });
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const issue = await createIssue({
    ...parsed.data.body,
    createdBy: new Types.ObjectId(req.user._id),
  });

  res.status(201).json(issue);
};

export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const schema = z.object({
    body: z.object({
      status: z.nativeEnum(IssueStatus),
      priority: z.nativeEnum(IssuePriority).optional(),
    }),
  });
  const parsed = schema.safeParse({ body: req.body });
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const issue = await Issue.findByIdAndUpdate(
    id,
    parsed.data.body,
    { new: true }
  );
  res.json(issue);
};

export const voteIssue = async (req: Request, res: Response) => {
  if (!req.user?._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params as { id: string };
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid issue id" });
  }

  const existing = await Vote.findOne({
    issue: id,
    user: req.user._id,
  });

  if (existing) {
    await existing.deleteOne();
    return res.json({ voted: false });
  }

  await Vote.create({ issue: id, user: req.user._id });
  res.json({ voted: true });
};


