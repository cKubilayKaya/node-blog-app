import { findUserService } from "../../services/auth/findUserService.js";

export const findUserController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const response = await findUserService(username);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
