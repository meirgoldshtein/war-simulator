import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken";
export default (req: Request, res : Response, next :NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: "Unauthorized: token not found" });
            return 
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        
        if (!(decodedToken as any).isAdmin) {
            return res.status(401).json({ message: "only admins can access" });
        }
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(error as JsonWebTokenError);
        return 
    }
}