import Joi from "joi";
import { categoryIdsSchema, excerptSchema, featuredImageUrlSchema, postSlugSchema, updatePostContentSchema, updatePostTitleSchema } from "../index.js";

export const updatePostSchema = Joi.object({
  title: updatePostTitleSchema(),
  content: updatePostContentSchema(),
  categories: categoryIdsSchema(),
  featuredImageUrl: featuredImageUrlSchema(),
  excerpt: excerptSchema(),
  slug: postSlugSchema(),
});
