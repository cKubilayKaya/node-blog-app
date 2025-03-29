import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";

export const uniquePostService = async (slug, comments) => {
  const findPost = await prisma.post.findUnique({
    where: {
      slug,
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

  if (!findPost) throw new CustomError("There is no post with this slug.", 404);

  return { success: true, post: findPost };
};
