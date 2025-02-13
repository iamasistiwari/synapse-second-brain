import dotenv from "dotenv";
dotenv.config();
export default function checkEnv() {
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;
  const SECRET_KEY = process.env.SECRET_KEY;
  const NODE_ENV = process.env.NODE_ENV;

  if (
    !NEXTAUTH_SECRET ||
    !SUPABASE_URL ||
    !SUPABASE_KEY ||
    !SECRET_KEY ||
    !NODE_ENV
  ) {
    throw new Error("ENV VARIABLES IS MISSING");
  }
}
checkEnv();
