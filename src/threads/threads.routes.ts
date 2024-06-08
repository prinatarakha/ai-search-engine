import express from "express";
import { validateRequest } from "../middlewares/validate";
import { initiateThreadDto } from "./threads.dto";
import * as Handler from "./threads.handler";

const router = express.Router();

router.post("", validateRequest(initiateThreadDto), Handler.initiateThread);
router.get("", Handler.getLatestThreads);

export default router;