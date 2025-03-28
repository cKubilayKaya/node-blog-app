import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";

export const deleteCategoryService = async (slug) => {
  if (!slug) {
    throw new CustomError("Slug is missing!", 400);
  }

  const existingSlug = await prisma.category.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!existingSlug) {
    throw new CustomError("There is no category with this slug.", 404);
  }
  await prisma.category.delete({
    where: {
      slug: slug,
    },
  });

  return { success: true, message: "Category deleted successfully!" };
};
