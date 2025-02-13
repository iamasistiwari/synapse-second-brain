import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;
const NODE_ENV = process.env.NODE_ENV!;

export default function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token;
    if (NODE_ENV === "production") {
      token = req.cookies["__Secure-next-auth.session-token"];
    } else {
      token = req.cookies["next-auth.session-token"];
    }
    const decoded = jwt.verify(token, NEXTAUTH_SECRET) as JwtPayload;
    if (decoded && decoded.id) {
      req.userId = decoded.id;
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "Unauthorized Request" });
    return;
  }
}
