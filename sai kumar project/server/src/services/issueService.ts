import { Types } from "mongoose";
import { Issue } from "../models/Issue";
import { IssueCategory, IssuePriority } from "../types/issue";
import { classifyIssue } from "./mlService";

export type CreateIssueInput = {
  title: string;
  description: string;
  createdBy: Types.ObjectId | string;
  category?: IssueCategory | undefined;
  priority?: IssuePriority | undefined;
  location?: string | undefined;
};

export const createIssue = async (payload: CreateIssueInput) => {
  const mlPrediction = await classifyIssue(
    `${payload.title}\n${payload.description}`
  );

  const issue = new Issue({
    ...payload,
    ...(mlPrediction && {
      mlPrediction: {
        category: mlPrediction.category,
        confidence: mlPrediction.confidence,
      },
    }),
  });

  return issue.save();
};


