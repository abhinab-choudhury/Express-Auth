import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const DATABASE_URL = process.env.DATABASE_URL;

const requiredEnvVariables = ["PORT", "FRONTEND_URL", "DATABASE_URL"];

requiredEnvVariables.some((envVar: string) => {
  if (!process.env[envVar]) {
    console.log(envVar, "is required.");
    process.exit(1);
  }
});
