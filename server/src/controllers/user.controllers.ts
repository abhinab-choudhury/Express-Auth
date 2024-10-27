import { NextFunction, Request, Response } from "express";

// get the present Authenticated User
export const getAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

// get user Details by Email
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

// update user details
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

// search users
export const getUsers = async () => {};

// Delete the User i.e make the user-status inactive
export const DeleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
