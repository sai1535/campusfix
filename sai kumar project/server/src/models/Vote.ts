import mongoose, { Schema, Document } from "mongoose";

export interface IVote extends Document {
  issue: Schema.Types.ObjectId | string;
  user: Schema.Types.ObjectId | string;
}

const voteSchema = new Schema<IVote>(
  {
    issue: { type: Schema.Types.ObjectId, ref: "Issue", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

voteSchema.index({ issue: 1, user: 1 }, { unique: true });

export const Vote = mongoose.model<IVote>("Vote", voteSchema);


