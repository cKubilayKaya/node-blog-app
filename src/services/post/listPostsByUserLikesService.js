import { CustomError } from "../../utils/customError.js";
import { isUserExist } from "../../utils/isUserExist.js";
import paginationService from "../../utils/paginationService.js";
import prisma from "../../utils/prisma.js";

export const listPostsByUserLikesService = async (userId, page, limit, order, comments) => {
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

  const userLikes = await prisma.like.findMany({
    where: {
      userId,
    },
    select: {
      postId: true,
    },
  });

  const likedPostIds = userLikes.map((like) => like.postId);

  const findPosts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
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

  if (!findPosts) throw new CustomError("There is no post with this user id.", 404);

  const postsWithLikes = findPosts.map((post) => {
    const isLiked = likedPostIds.includes(post.id);
    return {
      ...post,
      isLiked,
    };
  });

  const pagination = await paginationService("post", page, limit);

  return { success: true, post: postsWithLikes, pagination };
};
