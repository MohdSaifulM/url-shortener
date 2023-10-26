import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const checkIfAuthenticated = (token: string | undefined): boolean => {
    // Return false if no token
    if (!token) return false;
    // Split bearer token to 'Bearer' string and token
    const tokenArray: string[] = token.split(" ");
    // Decode token and return user id
    const userId = jwt.decode(tokenArray[1]);
    // If not found return false
    if (!userId) return false;
    // Return true if user is authenticated
    return true;
}

// Check if current user is authenticated to make request
export const authenticationCheck = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.get('Authorization');
    const isAuthenticated = checkIfAuthenticated(token);
    if (!isAuthenticated) return res.status(403).json('You are not authenticated');
    return next();
}