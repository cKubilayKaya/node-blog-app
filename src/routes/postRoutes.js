import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";
import { createPostController } from "../controllers/post/createPostController.js";
import { createPostSchema } from "../validations/post/createPostSchema.js";
import { listPostController } from "../controllers/post/listPostController.js";
import { uniquePostController } from "../controllers/post/uniquePostController.js";
import { updatePostController } from "../controllers/post/updatePostController.js";
import { updatePostSchema } from "../validations/post/updatePostSchema.js";
import { deletePostController } from "../controllers/post/deletePostController.js";

const router = express.Router();

router.post("/", authenticateUser, validationMiddleware(createPostSchema), createPostController);
router.get("/", listPostController);
router.get("/:slug", uniquePostController);
router.patch("/:slug", authenticateUser, validationMiddleware(updatePostSchema), updatePostController);
router.delete("/:slug", authenticateUser, deletePostController);

export default router;
