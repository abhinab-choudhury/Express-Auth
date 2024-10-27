import { NextFunction, Request, Response } from 'express';

// get the present Authenticated User
export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
}

// get user Details by Email
export async function getUserByEmail(req: Request, res: Response, next: NextFunction) {
}

// update user details
export async function updateUser(req: Request, res: Response, next: NextFunction) {
}

// search users
export async function getUsers() {
}

// Delete the User i.e make the user-status inactive
export async function DeleteAccount(req: Request, res: Response, next: NextFunction) {
}