import { CustomError } from "../../utils/customError.js";
import prisma from "../../utils/prisma.js";

export const uniqueCategoryService = async (slug) => {
  const findCategory = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (!findCategory) throw new CustomError("There is no category with this slug.", 404);

  return { success: true, category: findCategory };
};
