import { Router } from "express";
import { authenticationCheck } from "../middleware/authenticationCheck";
import { login, register, updatePassword } from '../controllers/userController';

const userRoutes: Router = Router();

//?===========Unprotected Routes===========
userRoutes.post('/login', login);

userRoutes.post('/register', register);

//?===========Protected Routes - Needs to be authenticated===========
userRoutes.patch('/update-password', authenticationCheck, updatePassword);

export default userRoutes;