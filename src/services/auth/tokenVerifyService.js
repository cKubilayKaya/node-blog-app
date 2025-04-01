import jwt from "jsonwebtoken";
import { CustomError } from "../../utils/customError.js";

export const tokenVerifyService = async (token) => {
  if (!token) {
    throw new CustomError("Token not found!", 404);
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedUser?.id) {
      throw new CustomError("Invalid token!", 400);
    }
    return { success: true };
  } catch (error) {
    throw new CustomError("Invalid or expired token!", 401);
  }
};
