import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";

export const uniquePostService = async (slug, comments) => {
  const findPost = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      categories: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
      author: {
        select: {
          id: true,
          email: true,
          fullname: true,
          username: true,
          profileImageUrl: true,
        },
      },
      ...(comments
        ? {
            comments: {
              orderBy: {
                createdAt: "desc",
              },
              select: {
                id: true,
                content: true,
                createdAt: true,
                author: {
                  select: {
                    email: true,
                    fullname: true,
                    username: true,
                    profileImageUrl: true,
                  },
                },
              },
            },
          }
        : {}),
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!findPost) throw new CustomError("There is no post with this slug.", 404);

  return { success: true, post: findPost };
};
