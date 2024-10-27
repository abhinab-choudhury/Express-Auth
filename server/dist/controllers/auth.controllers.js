"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = Signup;
exports.ResetPassword = ResetPassword;
exports.VerifyEmail = VerifyEmail;
exports.VerifyCode = VerifyCode;
exports.Logout = Logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_db_1 = __importDefault(require("./../db/index.db"));
// Local Passport Strategy - signup the user
async function Signup(req, res, next) {
    const { email, password, verificationCode, // use while implement email verification
     } = req.body;
    try {
        const existingUser = await index_db_1.default.user.findUnique({
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
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await index_db_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                isActive: true,
            },
            select: { email: true, isActive: true },
        });
        req.logIn(newUser, (error) => {
            if (error)
                throw error;
            res.status(201).json({
                success: true,
                message: "New User Created",
                data: newUser,
                error: {},
                status: 201,
            });
        });
    }
    catch (error) {
        next(error);
    }
}
// Reset Password
async function ResetPassword(req, res, next) { }
// Verify the Email i.e for Local Strategy
async function VerifyEmail() { }
// Verify the OPT/Code for Email Verification and Reset-Password
async function VerifyCode(req, res, next) { }
// LogOut the User
async function Logout(req, res, next) { }
