import { tokenVerifyService } from "../../services/auth/tokenVerifyService.js";

export const tokenVerifyController = async (req, res, next) => {
  try {
    const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");

    const response = await tokenVerifyService(token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
