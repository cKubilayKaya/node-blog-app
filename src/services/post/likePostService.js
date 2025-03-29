import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";
import jwt from "jsonwebtoken";

export const likePostService = async (slug, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);

  const findPost = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!findPost) throw new CustomError("There is no post with this slug.", 404);

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId: findPost.id,
        userId: decodedUser.id,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        postId_userId: {
          postId: findPost.id,
          userId: decodedUser.id,
        },
      },
    });

    await prisma.post.update({
      where: {
        id: findPost.id,
      },
      data: {
        liked: {
          decrement: 1,
        },
      },
    });

    return { success: true, message: "Like removed successfully" };
  } else {
    await prisma.like.create({
      data: {
        postId: findPost.id,
        userId: decodedUser.id,
      },
    });

    await prisma.post.update({
      where: {
        id: findPost.id,
      },
      data: {
        liked: {
          increment: 1,
        },
      },
    });

    return { success: true, message: "Post liked successfully" };
  }
};
