import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";
import { createCommentSchema } from "../validations/comment/createCommentSchema.js";
import { createCommentController } from "../controllers/comment/createCommentController.js";

const router = express.Router();

router.post("/", authenticateUser, validationMiddleware(createCommentSchema), createCommentController);

export default router;
