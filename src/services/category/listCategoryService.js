import { CustomError } from "../../utils/customError.js";
import paginationService from "../../utils/paginationService.js";
import prisma from "../../utils/prisma.js";

export const listCategoryService = async (page, limit, order) => {
  if (page <= 0 || limit <= 0) {
    throw new CustomError("Page and limit must be greater than 0", 400);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order)) {
    throw new CustomError("Order must be 'asc' or 'desc'", 400);
  }

  const skip = (page - 1) * limit;

  const categories = await prisma.category.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: order === "desc" ? "desc" : "asc",
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  const pagination = await paginationService("category", page, limit);

  return { success: true, categories, pagination };
};
