import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";
import bcrypt from "bcrypt";
import { verifyTimeLimit } from "../../utils/verifyTimeLimit.js";
import { CustomError } from "../../utils/customError.js";
import excludeFieldsFromArray from "../../utils/excludeFieldsFromArray.js";

export const emailVerifyService = async (email, code) => {
  const user = await isUserExist({ key: "email", value: email }, true);

  if (!user) throw new CustomError("There is no such a user!", 404);
  if (user?.isEmailVerified) throw new CustomError("This user is already verified!", 400);

  verifyTimeLimit(user, "emailVerificationCreatedAt");

  const isMatch = await bcrypt.compare(code, user.emailVerificationCode);
  if (!isMatch) throw new CustomError("Wrong Email Verification Code!", 400);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      isEmailVerified: true,
      emailVerificationCode: null,
      emailVerificationCreatedAt: null,
    },
  });

  const excludeFields = [
    "id",
    "password",
    "emailVerificationCode",
    "passwordResetCode",
    "emailVerificationCreatedAt",
    "passwordResetExpires",
    "wrongLoginAttempts",
    "isBlocked",
  ];

  const filteredUser = excludeFieldsFromArray(excludeFields, updatedUser);

  return { success: true, user: filteredUser };
};
