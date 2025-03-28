import Joi from "joi";
import { categoryIdsSchema, excerptSchema, featuredImageUrlSchema, postContentSchema, postSlugSchema, postTitleSchema } from "../index.js";

export const createPostSchema = Joi.object({
  title: postTitleSchema(),
  content: postContentSchema(),
  categories: categoryIdsSchema(),
  featuredImageUrl: featuredImageUrlSchema(),
  excerpt: excerptSchema(),
  slug: postSlugSchema(),
});
