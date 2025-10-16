import { Router } from "express";
import { getEmbedding } from "../controllers/embeeding.controller";

const router = Router();

router.post("/", getEmbedding);

export default router;
