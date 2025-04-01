import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";
import makeSlug from "../../utils/makeSlug.js";

export const updatePostService = async (data, slug) => {
  const dataObject = {
    ...data,
    ...(data?.title && { slug: makeSlug(data?.title) }),
    ...(data?.featuredImageUrl ? { featuredImageUrl: data?.featuredImageUrl } : {}),
    categories: {
      set: [],
      connect: data?.categories?.map((id) => ({ id })) || [],
    },
  };

  const existingPost = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!existingPost) {
    throw new CustomError("There is no post with this slug.", 404);
  }

  if (data?.name) {
    const existingSlug = await prisma.post.findUnique({
      where: {
        slug: makeSlug(data?.name),
      },
    });

    if (existingSlug) {
      throw new CustomError("A post with this slug already exists.", 409);
    }
  }

  const updatedPost = await prisma.post.update({
    where: {
      slug: slug,
    },
    data: dataObject,
  });

  return { success: true, post: updatedPost };
};
