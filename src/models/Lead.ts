import mongoose, { Schema, Document } from "mongoose";
import { LEAD_STATUSES, LEAD_SOURCES } from "../constants";
import { LeadStatus, LeadSource } from "../interfaces";

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New",
    },
    source: {
      type: String,
      enum: LEAD_SOURCES,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster search queries
leadSchema.index({ name: "text", email: "text" });
leadSchema.index({ status: 1, source: 1 });

const Lead = mongoose.model<ILeadDocument>("Lead", leadSchema);
export default Lead;
