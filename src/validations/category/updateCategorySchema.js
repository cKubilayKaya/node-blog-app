import Joi from "joi";
import { categoryDescriptionSchema, categorySlugSchema, updateCategoryNameSchema } from "../index.js";

export const updateCategorySchema = Joi.object({
  slug: categorySlugSchema(),
  name: updateCategoryNameSchema(),
  description: categoryDescriptionSchema(),
});
