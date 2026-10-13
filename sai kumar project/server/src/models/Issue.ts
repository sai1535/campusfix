import mongoose, { Schema, Document, Types } from "mongoose";
import { IssueCategory, IssuePriority, IssueStatus } from "../types/issue";

export interface IAttachment {
  url: string;
  name: string;
}

export interface IIssue extends Document {
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: IssuePriority;
  location?: string;
  createdBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  attachment?: IAttachment;
  mlPrediction?: {
    category: IssueCategory;
    confidence: number;
  };
}

const issueSchema = new Schema<IIssue>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(IssueCategory),
      default: IssueCategory.Other,
    },
    status: {
      type: String,
      enum: Object.values(IssueStatus),
      default: IssueStatus.NotStarted,
    },
    priority: {
      type: String,
      enum: Object.values(IssuePriority),
      default: IssuePriority.Medium,
    },
    location: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    attachment: {
      url: String,
      name: String,
    },
    mlPrediction: {
      category: {
        type: String,
        enum: Object.values(IssueCategory),
      },
      confidence: Number,
    },
  },
  { timestamps: true }
);

export const Issue = mongoose.model<IIssue>("Issue", issueSchema);


