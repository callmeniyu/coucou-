import { Router } from "express";
import { joinRoom, createRoom } from "../controllers/room.controller.js";

const router = Router();

router.post("/joinRoom", joinRoom);
router.post("/createRoom", createRoom);

export default router;
