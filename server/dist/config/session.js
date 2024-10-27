"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const secrets_1 = require("./../utils/secrets");
const cookieConfig = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
if (secrets_1.NODE_ENV === "production") {
    cookieConfig.secure = true;
}
const sessionConfig = {
    secret: secrets_1.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: cookieConfig,
    rolling: true,
    // store:
    genid(req) {
        // @ts-ignore
        const userId = req.user?.id;
        const randomID = crypto_1.default.randomUUID();
        if (userId) {
            return `${userId}-${randomID}`;
        }
        else {
            return `${randomID}`;
        }
    },
};
exports.default = sessionConfig;
