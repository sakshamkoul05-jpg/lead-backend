import { Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest, LeadQueryParams } from "../interfaces";
import { PAGINATION_LIMIT } from "../constants";

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = "1",
      limit = String(PAGINATION_LIMIT),
      status,
      source,
      search,
      sort = "latest",
    } = req.query as LeadQueryParams;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Build filter object
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (source) filter.source = source;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const sortOrder = sort === "oldest" ? 1 : -1;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limitNum)
        .populate("createdBy", "name email"),
      Lead.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        leads,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch leads" });
  }
};

export const getLeadById = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("createdBy", "name email");
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }

    res.json({ success: true, data: { lead } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch lead" });
  }
};

export const createLead = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status: status || "New",
      source,
      createdBy: req.user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: { lead },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create lead" });
  }
};

export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }

    // sales users can only edit their own leads
    if (
      req.user?.role === "sales" &&
      lead.createdBy.toString() !== req.user.id
    ) {
      res.status(403).json({ success: false, message: "Not authorized to edit this lead" });
      return;
    }

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Lead updated successfully",
      data: { lead: updated },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update lead" });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }

    // Only admin or the creator can delete
    if (
      req.user?.role !== "admin" &&
      lead.createdBy.toString() !== req.user?.id
    ) {
      res.status(403).json({ success: false, message: "Not authorized to delete this lead" });
      return;
    }

    await lead.deleteOne();

    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete lead" });
  }
};
