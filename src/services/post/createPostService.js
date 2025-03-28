import prisma from "../../utils/prisma.js";
import { CustomError } from "../../utils/customError.js";
import makeSlug from "../../utils/makeSlug.js";
import jwt from "jsonwebtoken";

export const createPostService = async (data, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);

  const slug = makeSlug(data?.title);

  const existingPost = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (existingPost) throw new CustomError("This post already exists.", 409);

  const dataObject = {
    ...data,
    slug: makeSlug(data?.title),
    authorId: decodedUser?.id,
    categories: {
      connect: data?.categories?.map((categoryId) => ({
        id: categoryId,
      })),
    },
  };

  const createdPost = await prisma.post.create({
    data: {
      ...dataObject,
    },
  });

  return { success: true, post: createdPost };
};
