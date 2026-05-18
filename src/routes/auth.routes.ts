import { Router } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import { registerValidator, loginValidator } from "../validators/auth.validator";
import { validate } from "../middleware/validate.middleware";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/profile", protect, getProfile);

export default router;
