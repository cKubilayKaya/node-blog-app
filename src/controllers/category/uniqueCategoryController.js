import { uniqueCategoryService } from "../../services/category/uniqueCategoryService.js";

export const uniqueCategoryController = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const response = await uniqueCategoryService(slug);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
