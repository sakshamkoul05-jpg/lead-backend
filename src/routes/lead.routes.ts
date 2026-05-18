import { Router } from "express";
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";
import { createLeadValidator, updateLeadValidator } from "../validators/lead.validator";
import { validate } from "../middleware/validate.middleware";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// All lead routes require authentication
router.use(protect);

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLeadValidator, validate, createLead);
router.put("/:id", updateLeadValidator, validate, updateLead);
router.delete("/:id", deleteLead);

export default router;
