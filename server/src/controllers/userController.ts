import { Response, Request } from "express";
import config from "config"
import { UserType } from "../types/userType";
import user from "../models/user";
import { fetchUserId } from "../utils/fetchUserId";
import { encryptData } from "../utils/encryptData";
import { decryptData } from "../utils/decryptData";
import jwt from "jsonwebtoken";

import { catchAsync } from "../middleware/catchAsync";

const createToken = (_id: string) => {
    const secretKey = config.get("JWT_SECRET") as string;
    return jwt.sign({ _id }, secretKey , { expiresIn: "3d" });
};

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = JSON.parse(decryptData(req.body.payload));
    const logged_in_user = await user.login(username, password);
    const token = createToken(logged_in_user._id);
    res.status(200).json(encryptData({ logged_in_user, token }));
});

export const register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;
    const logged_in_user: UserType = await user.register(
        name,
        email,
        password,
        confirmPassword
    );
    const token = createToken(logged_in_user._id);
    res.status(200).json({ logged_in_user, token });
});

export const updatePassword = catchAsync(async (req: Request, res: Response) => {
    const { password, confirmPassword } = req.body;
    const userToken: string | undefined = req.get("Authorization");
    const userId = fetchUserId(userToken);
    if (!userId || typeof userId === "boolean")
        return res.status(500).json("Something went wrong");
    await user.updatePassword(password, confirmPassword, userId);
    res.status(200).json("Successfully updated password!");
});