import { loginService } from "../../services/auth/loginService.js";

export const loginController = async (req, res, next) => {
  const data = req.body;
  try {
    const response = await loginService(data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
