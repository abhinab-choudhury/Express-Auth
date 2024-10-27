import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const DATABASE_URL = process.env.DATABASE_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const SERVER_URL = process.env.SERVER_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const requiredEnvVariables = [
  "PORT",
  "FRONTEND_URL",
  "DATABASE_URL",
  "NODE_ENV",
  "SERVER_URL",
  "SESSION_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
];

requiredEnvVariables.some((envVar: string) => {
  if (!process.env[envVar]) {
    console.log(envVar, "is required.");
    process.exit(1);
  }
});
