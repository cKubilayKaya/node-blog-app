import { listPostsByCategoryService } from "../../services/category/listPostsByCategoryService.js";

export const listPostsByCategoryController = async (req, res, next) => {
  const { slug } = req.params;
  const { page = 1, limit = 10, order = "asc" } = req.query;

  try {
    const response = await listPostsByCategoryService(Number(page), Number(limit), order, slug);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
