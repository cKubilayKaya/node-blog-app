import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";
import jwt from "jsonwebtoken";

export const uniquePostWithUserLikesService = async (slug, comments, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);

  const findPost = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      ...(comments ? { comments: true } : {}),
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!findPost) throw new CustomError("There is no post with this slug.", 404);

  const userLikes = await prisma.like.findMany({
    where: {
      userId: decodedUser.id,
    },
    select: {
      postId: true,
    },
  });

  const likedPostIds = userLikes.map((like) => like.postId);

  const isLiked = likedPostIds.includes(findPost.id);

  return {
    success: true,
    post: {
      ...findPost,
      isLiked,
    },
  };
};
