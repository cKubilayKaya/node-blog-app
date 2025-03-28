import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";
import { createPostController } from "../controllers/post/createPostController.js";
import { createPostSchema } from "../validations/post/createPostSchema.js";
import { listPostController } from "../controllers/post/listPostController.js";

const router = express.Router();

router.post("/", authenticateUser, validationMiddleware(createPostSchema), createPostController);
router.get("/", listPostController);

export default router;
