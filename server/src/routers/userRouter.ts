import { Router } from "express";
import { login, register, verify } from "../controllers/userController";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", (req, res) => {});

router.post("/verify", verifyUser ,verify);

export default router;
