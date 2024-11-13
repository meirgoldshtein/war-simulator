import { Router } from "express";
import verifyUser from "../middlewares/verifyUser";
import { getAttacks, launchAttack, updateAttack } from "../controllers/attackController";

const router = Router();

router.get("/", verifyUser, getAttacks);

router.post("/launch",verifyUser, launchAttack);

router.patch("/update",verifyUser, updateAttack);



export default router;
