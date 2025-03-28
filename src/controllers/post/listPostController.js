import { listPostsService } from "../../services/post/listPostsService.js";

export const listPostController = async (req, res, next) => {
  const { page = 1, limit = 10, order = "asc" } = req.query;
  try {
    const listPostsRes = await listPostsService(Number(page), Number(limit), order);
    res.status(200).json(listPostsRes);
  } catch (error) {
    next(error);
  }
};
