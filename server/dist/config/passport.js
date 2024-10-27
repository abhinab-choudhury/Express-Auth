"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_db_1 = __importDefault(require("./../db/index.db"));
const secrets_1 = require("./../utils/secrets");
passport_1.default.serializeUser((user, cb) => {
    // @ts-ignore
    cb(null, user.id);
});
passport_1.default.deserializeUser(async (userId, cb) => {
    try {
        const user = await index_db_1.default.user.findUnique({
            where: { id: userId },
        });
        cb(null, user);
    }
    catch (error) {
        cb(error);
    }
});
passport_1.default.use("local-strategy", new passport_local_1.Strategy({ usernameField: "email" }, async (username, password, cb) => {
    try {
        const existingUser = await index_db_1.default.user.findUnique({
            where: { email: username },
            select: { email: true, password: true, id: true },
        });
        if (!existingUser || !existingUser.password) {
            return cb(null, false);
        }
        const passwordMatch = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return cb(null, false);
        }
        const { password: _, ...user } = existingUser;
        return cb(null, user);
    }
    catch (error) {
        cb(error);
    }
}));
passport_1.default.use("google-strategy", new passport_google_oauth20_1.Strategy({
    clientID: secrets_1.GOOGLE_CLIENT_ID,
    clientSecret: secrets_1.GOOGLE_CLIENT_SECRET,
    callbackURL: `${secrets_1.SERVER_URL}/api/v1/auth/oauth2/redirect/google`,
    scope: ["email", "profile"],
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        let user = await index_db_1.default.user.findUnique({
            where: { google_id: profile.id },
            select: { email: true, google_id: true, id: true },
        });
        if (!user) {
            user = await index_db_1.default.user.create({
                data: {
                    email: profile._json.email,
                    display_name: profile.displayName,
                    profile_pic_url: profile._json.picture,
                    google_id: profile.id,
                    isActive: true,
                },
                select: { email: true, google_id: true, id: true },
            });
        }
        cb(null, user);
    }
    catch (error) {
        if (error instanceof Error) {
            cb(error);
        }
        else {
            throw error;
        }
    }
}));
passport_1.default.use("github-strategy", new passport_github2_1.Strategy({
    clientID: secrets_1.GITHUB_CLIENT_ID,
    clientSecret: secrets_1.GITHUB_CLIENT_SECRET,
    callbackURL: `${secrets_1.SERVER_URL}/api/v1/auth/oauth2/redirect/github`,
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        let user = await index_db_1.default.user.findUnique({
            where: {
                github_id: profile.id,
            },
            select: { email: true, github_id: true, id: true },
        });
        if (!user) {
            user = await index_db_1.default.user.create({
                data: {
                    github_id: profile.id,
                    email: profile.emails?.[0].value ?? "",
                    profile_pic_url: profile.photos?.[0].value,
                    display_name: profile.displayName,
                    isActive: true,
                },
            });
        }
        cb(null, user);
    }
    catch (error) {
        if (error instanceof Error) {
            cb(error);
        }
        else {
            throw error;
        }
    }
}));
