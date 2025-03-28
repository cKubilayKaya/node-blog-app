import { uniquePostService } from "../../services/post/uniquePostService.js";

export const uniquePostController = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const response = await uniquePostService(slug);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
