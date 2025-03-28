import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";

export const deletePostService = async (slug) => {
  if (!slug) {
    throw new CustomError("Slug is missing!", 400);
  }

  const existingSlug = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!existingSlug) {
    throw new CustomError("There is no post with this slug.", 404);
  }
  await prisma.post.delete({
    where: {
      slug: slug,
    },
  });

  return { success: true, message: "Post deleted successfully!" };
};
