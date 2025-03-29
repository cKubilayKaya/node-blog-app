import { listPostsByUserIDService } from "../../services/post/listPostsByUserIDService.js";
import { listPostsByUserLikesService } from "../../services/post/listPostsByUserLikesService.js";

export const listPostsByUserIDController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const { page = 1, limit = 10, order = "asc", comments = false } = req.query;
  const { userId } = req.params;
  try {
    let response;
    if (token) {
      response = await listPostsByUserLikesService(userId, Number(page), Number(limit), order, comments, token);
    } else {
      response = await listPostsByUserIDService(userId, Number(page), Number(limit), order, comments);
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
