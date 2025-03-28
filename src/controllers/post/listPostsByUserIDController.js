import { listPostsByUserIDService } from "../../services/post/listPostsByUserIDService.js";

export const listPostsByUserIDController = async (req, res, next) => {
  const { page = 1, limit = 10, order = "asc" } = req.query;
  const { userId } = req.params;
  try {
    const listPostsByUserIDRes = await listPostsByUserIDService(userId, Number(page), Number(limit), order);
    res.status(200).json(listPostsByUserIDRes);
  } catch (error) {
    next(error);
  }
};
