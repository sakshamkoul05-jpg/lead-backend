import { body } from "express-validator";
import { LEAD_STATUSES, LEAD_SOURCES } from "../constants";

export const createLeadValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("status")
    .optional()
    .isIn(LEAD_STATUSES)
    .withMessage(`Status must be one of: ${LEAD_STATUSES.join(", ")}`),
  body("source")
    .notEmpty()
    .withMessage("Source is required")
    .isIn(LEAD_SOURCES)
    .withMessage(`Source must be one of: ${LEAD_SOURCES.join(", ")}`),
];

export const updateLeadValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("status")
    .optional()
    .isIn(LEAD_STATUSES)
    .withMessage(`Status must be one of: ${LEAD_STATUSES.join(", ")}`),
  body("source")
    .optional()
    .isIn(LEAD_SOURCES)
    .withMessage(`Source must be one of: ${LEAD_SOURCES.join(", ")}`),
];
