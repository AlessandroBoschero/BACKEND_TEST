/*
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function hashPassword(password2Hash: string) {
    const round = parseInt(process.env.SALT!);
    const salt = await bcrypt.genSalt(round || 10);
    const hashedPassword = await bcrypt.hash(password2Hash, salt);
    return hashedPassword;
}
*/