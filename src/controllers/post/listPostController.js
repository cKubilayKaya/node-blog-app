import { listPostsService } from "../../services/post/listPostsService.js";
import { listPostsWithUserLikesService } from "../../services/post/listPostsWithUserLikesService.js";

export const listPostController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const { page = 1, limit = 10, order = "asc", comments = false } = req.query;
  try {
    let response;
    if (token) {
      response = await listPostsWithUserLikesService(Number(page), Number(limit), order, comments, token);
    } else {
      response = await listPostsService(Number(page), Number(limit), order, comments);
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
