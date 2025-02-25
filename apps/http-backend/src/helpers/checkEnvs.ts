import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "NEXTAUTH_SECRET",
  "SUPABASE_URL",
  "SUPABASE_KEY",
  "SECRET_KEY",
  "NODE_ENV",
] as const;

export default function checkEnv() {
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    throw new Error(`Missing ENV variables: ${missingVars.join(", ")}`);
  }
}

checkEnv();
