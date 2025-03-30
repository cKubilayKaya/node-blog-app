import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";

export const listPostsByCategoryService = async (page, limit, order, slug) => {
  if (page <= 0 || limit <= 0) {
    throw new CustomError("Page and limit must be greater than 0", 400);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order)) {
    throw new CustomError("Order must be 'asc' or 'desc'", 400);
  }

  const skip = (page - 1) * limit;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: { select: { posts: true } },
    },
  });

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  const posts = await prisma.post.findMany({
    where: { categories: { some: { id: category.id } } },
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: order === "desc" ? "desc" : "asc",
    },
    include: {
      author: {
        select: {
          email: true,
          fullname: true,
          username: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  const totalPosts = category._count.posts;
  const totalPages = Math.ceil(totalPosts / limit);

  return {
    success: true,
    category: {
      ...category,
      posts,
    },
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalPosts: totalPosts,
      limit: limit,
    },
  };
};
