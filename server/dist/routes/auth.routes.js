"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthControllers = __importStar(require("./../controllers/auth.controllers"));
const is_authenticated_middleware_1 = __importDefault(require("./../middlewares/is-authenticated.middleware"));
const passport_1 = __importDefault(require("passport"));
const rate_limit_1 = require("./../middlewares/rate-limit");
require("./../config/passport");
const router = (0, express_1.Router)();
router.post("/signup", AuthControllers.Signup);
router.post("/login", rate_limit_1.loginRateLimit, passport_1.default.authenticate("local-strategy"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "User this Email already exists",
        data: req.user,
        errors: {},
        status: 200,
    });
});
router.post("/reset-password", AuthControllers.ResetPassword);
router.post("/verify-email", AuthControllers.VerifyEmail);
router.post("/verify-code", AuthControllers.VerifyCode);
router.post("/logout", is_authenticated_middleware_1.default, AuthControllers.Logout);
router.get("/google", passport_1.default.authenticate("google-strategy"));
router.get("/oauth2/redirect/google", passport_1.default.authenticate("google-strategy", {
    successReturnToOrRedirect: 'http://localhost:5500/frontend/pages/profile.html',
    keepSessionInfo: true,
}));
router.get("/github", passport_1.default.authenticate("github-strategy"));
router.get("/oauth2/redirect/github", passport_1.default.authenticate("github-strategy", {
    successReturnToOrRedirect: 'http://localhost:5500/frontend/pages/profile.html',
    keepSessionInfo: true
}));
exports.default = router;
