import { changePasswordService } from "../../services/auth/changePasswordService.js";

export const changePasswordController = async (req, res, next) => {
  try {
    const { code, password, rePassword, email } = req.body;
    const response = await changePasswordService(code, password, rePassword, email);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
