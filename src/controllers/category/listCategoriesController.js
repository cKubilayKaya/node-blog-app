import { listCategoryService } from "../../services/category/listCategoryService.js";

export const listCategoriesController = async (req, res, next) => {
  const { page = 1, limit = 10, order = "asc" } = req.query;

  try {
    const response = await listCategoryService(Number(page), Number(limit), order);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
