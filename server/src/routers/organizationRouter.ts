import { Router } from "express";
import verifyUser from "../middlewares/verifyUser";
import { getOrganizations } from "../controllers/organizationController";

const router = Router();

router.get("/",  getOrganizations);


export default router;