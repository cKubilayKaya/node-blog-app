import { uniquePostService } from "../../services/post/uniquePostService.js";

export const uniquePostController = async (req, res, next) => {
  const { comments = false } = req.query;
  const { slug } = req.params;
  try {
    const response = await uniquePostService(slug, comments);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
