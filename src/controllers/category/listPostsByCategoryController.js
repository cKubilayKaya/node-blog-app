import { listPostsByCategoryService } from "../../services/category/listPostsByCategoryService.js";
import { listPostsWithIsLikedByCategoryService } from "../../services/category/listPostsWithIsLikedByCategoryService.js";

export const listPostsByCategoryController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const { slug } = req.params;
  const { page = 1, limit = 10, order = "asc" } = req.query;

  try {
    let response;
    if (token) {
      response = await listPostsWithIsLikedByCategoryService(Number(page), Number(limit), order, slug, token);
    } else {
      response = await listPostsByCategoryService(Number(page), Number(limit), order, slug);
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
