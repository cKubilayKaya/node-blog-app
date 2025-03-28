import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";

export const uniquePostService = async (slug) => {
  const findPost = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!findPost) throw new CustomError("There is no post with this slug.", 404);

  return { success: true, post: findPost };
};
