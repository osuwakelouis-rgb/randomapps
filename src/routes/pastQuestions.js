import { Router } from "express";
import { getPastQuestions } from "../controllers/pastQuestionController.js";

const router = Router();

router.get("/", getPastQuestions);

export default router;
