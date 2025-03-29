import { likePostService } from "../../services/post/likePostService.js";

export const likePostController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const { slug } = req.params;
  try {
    const response = await likePostService(slug, token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
