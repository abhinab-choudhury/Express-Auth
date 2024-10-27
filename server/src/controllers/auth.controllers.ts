import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import prisma from "./../db/index.db";

// Local Passport Strategy - signup the user
export async function Signup(req: Request, res: Response, next: NextFunction) {
  const {
    email,
    password,
    verificationCode, // use while implement email verification
  }: {
    username: string;
    email: string;
    password: string;
    verificationCode: number;
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User this Email already exists",
        data: {},
        errors: "Invalid Request",
        status: 409,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isActive: true,
      },
      select: { email: true, isActive: true },
    });
    req.logIn(newUser, (error) => {
      if (error) throw error;
      res.status(201).json({
        success: true,
        message: "New User Created",
        data: newUser,
        error: {},
        status: 201,
      });
    });
  } catch (error) {
    next(error);
  }
}

// Reset Password
export async function ResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

// Verify the Email i.e for Local Strategy
export async function VerifyEmail() {}

// Verify the OPT/Code for Email Verification and Reset-Password
export async function VerifyCode(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

// LogOut the User
export async function Logout(req: Request, res: Response, next: NextFunction) {}
