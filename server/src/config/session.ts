import { CookieOptions, SessionOptions } from "express-session";
import { Request } from "express";
import crypto from "crypto";
import { NODE_ENV, SESSION_SECRET } from "./../utils/secrets";

const cookieConfig: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

if (NODE_ENV === "production") {
  cookieConfig.secure = true;
}

const sessionConfig: SessionOptions = {
  secret: SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: cookieConfig,
  rolling: true,
  // store:
  genid(req: Request) {
    // @ts-ignore
    const userId = req.user?.id;
    const randomID = crypto.randomUUID();
    if (userId) {
      return `${userId}-${randomID}`;
    } else {
      return `${randomID}`;
    }
  },
};

export default sessionConfig;
