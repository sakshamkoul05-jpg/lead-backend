import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, UserRole } from "../interfaces";

interface JwtPayload {
  id: string;
  role: UserRole;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: "Token is invalid or expired" });
  }
};

// Only admin can access certain routes
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ success: false, message: "Access denied. Admins only." });
    return;
  }
  next();
};
