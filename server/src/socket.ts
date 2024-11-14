import { verify } from "jsonwebtoken";
import { TokenPayload } from "./types/tokenPayload";
import { io } from "./app";

const SECRET_KEY = process.env.JWT_SECRET as string

export const verifyToken = (token: string) => {
    try {
        return verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
