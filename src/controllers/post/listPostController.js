import { listPostsService } from "../../services/post/listPostsService.js";

export const listPostController = async (req, res, next) => {
  const { page = 1, limit = 10, order = "asc", comments = false } = req.query;
  try {
    const response = await listPostsService(Number(page), Number(limit), order, comments);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
