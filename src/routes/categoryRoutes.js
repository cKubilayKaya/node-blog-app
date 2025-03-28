import express from "express";
import { validationMiddleware } from "../middlewares/validationMiddleware.js";
import { createCategorySchema } from "../validations/category/createCategorySchema.js";
import { createCategoryController } from "../controllers/category/createCategoryController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { listCategoriesController } from "../controllers/category/listCategoriesController.js";
import { uniqueCategoryController } from "../controllers/category/uniqueCategoryController.js";
import { updateCategoryController } from "../controllers/category/updateCategoryController.js";
import { updateCategorySchema } from "../validations/category/updateCategorySchema.js";
import { deleteCategoryController } from "../controllers/category/deleteCategoryController.js";
import { listPostsByCategoryController } from "../controllers/category/listPostsByCategoryController.js";

const router = express.Router();

router.post("/", authenticateUser, validationMiddleware(createCategorySchema), createCategoryController);
router.get("/list", listCategoriesController);
router.get("/:slug", uniqueCategoryController);
router.patch("/:slug", authenticateUser, validationMiddleware(updateCategorySchema), updateCategoryController);
router.delete("/:slug", authenticateUser, deleteCategoryController);
router.get("/:slug/posts", listPostsByCategoryController);

export default router;
