import { NextFunction, Request, Response } from 'express';

// Local Passport Strategy - signup the user
export async function Signup() {
}

// Reset Password
export async function ResetPassword(req: Request, res: Response, next: NextFunction) {
}

// Verify the Email i.e for Local Strategy
export async function VerifyEmail() {
}

// Verify the OPT/Code for Email Verification and Reset-Password
export async function VerifyCode(req: Request, res: Response, next: NextFunction) {
}

// LogOut the User
export async function  Logout(req: Request, res: Response, next: NextFunction) {
}
