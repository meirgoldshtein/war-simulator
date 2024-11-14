import { Router } from "express";
import verifyUser from "../middlewares/verifyUser";
import { getAttacks, interceptAttack, launchAttack, updateAttack } from "../controllers/attackController";

const router = Router();

router.get("/", verifyUser, getAttacks);

router.post("/launch",verifyUser, launchAttack);

router.patch("/update",verifyUser, updateAttack);

router.post("/intercept",verifyUser, interceptAttack);



export default router;
