import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";
import makeSlug from "../../utils/makeSlug.js";

export const updateCategoryService = async (data, slug) => {
  const dataObject = {
    ...data,
    ...(data?.name && { slug: makeSlug(data?.name) }),
  };

  const existingCategory = await prisma.category.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!existingCategory) {
    throw new CustomError("There is no category with this slug.", 404);
  }

  if (data?.name) {
    const existingSlug = await prisma.category.findUnique({
      where: {
        slug: makeSlug(data?.name),
      },
    });

    if (existingSlug) {
      throw new CustomError("A category with this slug already exists.", 409);
    }
  }

  const updatedCategory = await prisma.category.update({
    where: {
      slug: slug,
    },
    data: dataObject,
  });

  return { success: true, category: updatedCategory };
};
