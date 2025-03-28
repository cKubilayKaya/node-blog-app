import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";
import makeSlug from "../../utils/makeSlug.js";

export const createCategoryService = async (name, description) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });

  if (existingCategory) throw new CustomError("This category already exists.", 409);

  const createdCategory = await prisma.category.create({
    data: {
      slug: makeSlug(name),
      name: name,
      description: description,
    },
  });

  return { success: true, category: createdCategory };
};
