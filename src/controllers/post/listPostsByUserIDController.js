import { listPostsByUserIDService } from "../../services/post/listPostsByUserIDService.js";

export const listPostsByUserIDController = async (req, res, next) => {
  const { page = 1, limit = 10, order = "asc", comments = false } = req.query;
  const { userId } = req.params;
  try {
    const response = await listPostsByUserIDService(userId, Number(page), Number(limit), order, comments);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
