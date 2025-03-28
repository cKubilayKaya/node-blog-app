import { forgotPasswordService } from "../../services/auth/forgotPasswordService.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await forgotPasswordService(email);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
