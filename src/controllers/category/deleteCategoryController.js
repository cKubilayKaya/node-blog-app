import { deleteCategoryService } from "../../services/category/deleteCategoryService.js";

export const deleteCategoryController = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const deleteCategoryRes = await deleteCategoryService(slug);
    res.status(200).json(deleteCategoryRes);
  } catch (error) {
    next(error);
  }
};
