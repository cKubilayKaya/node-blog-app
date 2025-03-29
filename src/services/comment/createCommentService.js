import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";
import jwt from "jsonwebtoken";

export const createCommentService = async (data, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);

  const { content, postId } = data;

  const existingPost = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!existingPost) {
    throw new CustomError("Post not found!", 404);
  }

  const createdComment = await prisma.comment.create({
    data: {
      content,
      authorId: decodedUser.id,
      postId,
    },
  });

  return { success: true, comment: createdComment };
};
