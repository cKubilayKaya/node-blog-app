import Joi from "joi";
import { commentContentSchema, commentPostIdSchema } from "../index.js";

export const createCommentSchema = Joi.object({
  content: commentContentSchema(),
  postId: commentPostIdSchema(),
});
