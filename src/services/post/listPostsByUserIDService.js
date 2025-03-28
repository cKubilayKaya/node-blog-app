import { CustomError } from "../../utils/customError.js";
import { isUserExist } from "../../utils/isUserExist.js";
import paginationService from "../../utils/paginationService.js";
import prisma from "../../utils/prisma.js";

export const listPostsByUserIDService = async (userId, page, limit, order) => {
  const user = await isUserExist({ key: "id", value: userId }, true);
  if (!user) throw new CustomError("This user does not exists.", 404);

  if (page <= 0 || limit <= 0) {
    throw new CustomError("Page and limit must be greater than 0", 400);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order)) {
    throw new CustomError("Order must be 'asc' or 'desc'", 400);
  }

  const skip = (page - 1) * limit;

  const findPost = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: order === "desc" ? "desc" : "asc",
    },
  });

  if (!findPost) throw new CustomError("There is no post with this user id.", 404);

  const pagination = await paginationService("post", page, limit);

  return { success: true, post: findPost, pagination };
};
