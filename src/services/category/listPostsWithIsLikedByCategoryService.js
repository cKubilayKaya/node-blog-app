import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";
import jwt from "jsonwebtoken";

export const listPostsWithIsLikedByCategoryService = async (page, limit, order, slug, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);

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

  // Get the liked posts of the user
  const userLikes = await prisma.like.findMany({
    where: {
      userId: decodedUser.id,
    },
    select: {
      postId: true,
    },
  });

  const likedPostIds = userLikes.map((like) => like.postId);

  // Find the posts in the category
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
          profileImageUrl: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  // Add the 'isLiked' property to each post
  const postsWithLikes = posts.map((post) => {
    const isLiked = likedPostIds.includes(post.id);
    return {
      ...post,
      isLiked,
    };
  });

  const totalPosts = category._count.posts;
  const totalPages = Math.ceil(totalPosts / limit);

  return {
    success: true,
    category: {
      ...category,
      posts: postsWithLikes,
    },
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalPosts: totalPosts,
      limit: limit,
    },
  };
};
