import Joi from "joi";
import { categoryDescriptionSchema, categoryNameSchema, categorySlugSchema } from "../index.js";

export const createCategorySchema = Joi.object({
  slug: categorySlugSchema(),
  name: categoryNameSchema(),
  description: categoryDescriptionSchema(),
});
