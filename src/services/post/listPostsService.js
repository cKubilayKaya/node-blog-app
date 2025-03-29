import { CustomError } from "../../utils/customError.js";
import paginationService from "../../utils/paginationService.js";
import prisma from "../../utils/prisma.js";

export const listPostsService = async (page, limit, order, comments) => {
  if (page <= 0 || limit <= 0) {
    throw new CustomError("Page and limit must be greater than 0", 400);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order)) {
    throw new CustomError("Order must be 'asc' or 'desc'", 400);
  }

  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: order === "desc" ? "desc" : "asc",
    },
    include: {
      ...(comments ? { comments: true } : {}),
      _count: {
        select: { comments: true },
      },
    },
  });

  const pagination = await paginationService("post", page, limit);

  return { success: true, posts, pagination };
};
