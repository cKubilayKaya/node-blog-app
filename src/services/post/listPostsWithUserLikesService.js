import { CustomError } from "../../utils/customError.js";
import paginationService from "../../utils/paginationService.js";
import prisma from "../../utils/prisma.js";
import jwt from "jsonwebtoken";

export const listPostsWithUserLikesService = async (page, limit, order, comments, token) => {
  if (page <= 0 || limit <= 0) {
    throw new CustomError("Page and limit must be greater than 0", 400);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order)) {
    throw new CustomError("Order must be 'asc' or 'desc'", 400);
  }

  const skip = (page - 1) * limit;

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);

  const userLikes = await prisma.like.findMany({
    where: {
      userId: decodedUser.id,
    },
    select: {
      postId: true,
    },
  });

  const likedPostIds = userLikes.map((like) => like.postId);

  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: order === "desc" ? "desc" : "asc",
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          fullname: true,
          username: true,
        },
      },
      ...(comments ? { comments: true } : {}),
      _count: {
        select: { comments: true },
      },
    },
  });

  const postsWithLikes = posts.map((post) => ({
    ...post,
    isLiked: likedPostIds.includes(post.id),
  }));

  const pagination = await paginationService("post", page, limit);

  return { success: true, postsWithLikes, pagination };
};
