import { meService } from "../../services/auth/meService.js";

export const meController = async (req, res, next) => {
  try {
    const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
    const response = await meService(token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
