import { resendEmailVerifyService } from "../../services/auth/resendEmailVerifyService.js";
import { CustomError } from "../../utils/customError.js";

export const resendEmailVerifyController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await resendEmailVerifyService(email);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
