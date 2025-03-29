import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";

export const deleteCommentService = async (id) => {
  if (!id) {
    throw new CustomError("Id is missing!", 400);
  }

  const existingComment = await prisma.comment.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingComment) {
    throw new CustomError("There is no comment with this id.", 404);
  }
  await prisma.comment.delete({
    where: {
      id: id,
    },
  });

  return { success: true, message: "Comment deleted successfully!" };
};
