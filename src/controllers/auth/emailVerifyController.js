import { emailVerifyService } from "../../services/auth/emailVerifyService.js";

export const emailVerifyController = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const response = await emailVerifyService(email, code);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
