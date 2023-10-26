import { model, Schema, Types } from "mongoose";
import { UserType } from "../types/userType";
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dateJoined: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

//?===========User Static Methods===========
userSchema.statics.register = async function (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
) {
    if (!username || !email || !password || !confirmPassword)
        throw Error("All fields must be filled");

    if (!validator.isEmail(email)) throw Error("Email is not valid");

    if (password !== confirmPassword) throw Error("Passwords do not match");

    if (!validator.isStrongPassword(password))
        throw Error("Password is not strong enough");

    const exist = await this.findOne({ $or: [{ username }, { email }] });

    if (exist) throw Error("user already exists");

    const date_joined = new Date();

    const hash = await bcrypt.hash(password, 12);
    const user = await this.create({
        username,
        password: hash,
        email,
        date_joined,
    });

    return user;
};

userSchema.statics.login = async function (username: string, password: string) {
    if (!username || !password) throw Error("All fields must be filled");

    const user = await this.findOne({ username });

    if (!user) throw Error("Incorrect username");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw Error("Incorrect password");

    return user;
};

userSchema.statics.updatePassword = async function (
    password: string,
    confirmPassword: string,
    userId: Types.ObjectId,
) {
    if (!confirmPassword || !password) throw Error("All fields must be filled");

    if (password !== confirmPassword) throw Error("Passwords must match!");

    if (!validator.isStrongPassword(password))
        throw Error("Password is not strong enough");

    const hash = await bcrypt.hash(password, 12);
    const user = await this.findByIdAndUpdate(userId, { password: hash });

    return user;
};

export default model<UserType>("User", userSchema);
