import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

export default function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["next-auth.session-token"];
    const decoded = jwt.verify(token, NEXTAUTH_SECRET) as JwtPayload;
    if (decoded && decoded.id) {
      req.userId = decoded.id;
      next();
    }
  } catch (error) {
    res.status(403).json("Unauthorized Request");
    return;
  }
}
