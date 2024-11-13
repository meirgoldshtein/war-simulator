import e, { Request, Response } from "express";
import { loginUserService, registerUser, verifyUserService } from "../services/users";
import { CustomError } from "../types/errors";

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUserService(req.body)
        if (user.success) {
            res.status(user.status).json(user)
        }
    } catch (error: CustomError | any) {
        res.status(error.status || 500).json(error.message)
    }
}

export const register = async (req: Request, res: Response) => {
    try {        
        const user = await registerUser(req.body)
        if (user.success) {
            res.status(user.status).json(user)
        }
        else {
            res.status(user.status).json(user)
        }
    } catch (error: CustomError | any) {
        res.status(error.status || 500).json(error.message)
    }
}

export const verify = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.user_id
        const user = await verifyUserService((req as any).user)
        if (user) {
            res.status(200).json(user)
        }
    } catch (error: CustomError | any) {
        console.log(error);
        res.status(error.status || 500).json(error.message)
    }
}