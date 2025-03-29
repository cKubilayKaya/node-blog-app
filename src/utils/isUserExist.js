import { CustomError } from "./customError.js";
import prisma from "./prisma.js";

export const isUserExist = async (field, findByEmailOrUsername = false, includeObject) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      [field.key]: field.value,
    },
    ...(includeObject && includeObject),
  });

  if (findByEmailOrUsername) {
    return existingUser;
  } else {
    if (existingUser) throw new CustomError("This user already exists.", 409);
  }
};
