import { Request } from "express";
import { LEAD_STATUSES, LEAD_SOURCES, USER_ROLES } from "../constants";

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadSource = (typeof LEAD_SOURCES)[number];
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extend express Request to include user info from JWT
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadQueryParams {
  page?: string;
  limit?: string;
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
}
