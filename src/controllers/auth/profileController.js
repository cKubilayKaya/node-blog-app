import { profileService } from "../../services/auth/profileService.js";

export const profileController = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");

    if (req.file) {
      data.profileImageUrl = `/uploads/users/${req?.file?.filename}`;
    }

    const response = await profileService(data, token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
