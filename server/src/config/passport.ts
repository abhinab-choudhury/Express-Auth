import passport, { Profile } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { VerifyCallback } from "passport-oauth2";
import bcrypt from "bcrypt";
import prisma from "./../db/index.db";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  SERVER_URL,
} from "./../utils/secrets";

passport.serializeUser((user: Express.User, cb) => {
  // @ts-ignore
  cb(null, user.id);
});

passport.deserializeUser(async (userId: string, cb) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});

passport.use(
  "local-strategy",
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, cb) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: username },
          select: { email: true, password: true, id: true },
        });
        if (!existingUser || !existingUser.password) {
          return cb(null, false);
        }

        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password,
        );
        if (!passwordMatch) {
          return cb(null, false);
        }

        const { password: _, ...user } = existingUser;
        return cb(null, user);
      } catch (error) {
        cb(error);
      }
    },
  ),
);

passport.use(
  "google-strategy",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${SERVER_URL}/api/v1/auth/oauth2/redirect/google`,
      scope: ["email","profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await prisma.user.findUnique({
          where: { google_id: profile.id },
          select: { email: true, google_id: true, id: true },
        });
        if (!user) {
          user = await prisma.user.create({
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
      } catch (error) {
        if (error instanceof Error) {
          cb(error);
        } else {
          throw error;
        }
      }
    },
  ),
);

passport.use(
  "github-strategy",
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
      callbackURL: `${SERVER_URL}/api/v1/auth/oauth2/redirect/github`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: VerifyCallback,
    ) => {
      try {
        let user = await prisma.user.findUnique({
          where: {
            github_id: profile.id,
          },
          select: { email: true, github_id: true, id: true },
        });
        if (!user) {
          user = await prisma.user.create({
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
      } catch (error) {
        if (error instanceof Error) {
          cb(error);
        } else {
          throw error;
        }
      }
    },
  ),
);
