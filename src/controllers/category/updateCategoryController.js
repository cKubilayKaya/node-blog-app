import { updateCategoryService } from "../../services/category/updateCategoryService.js";

export const updateCategoryController = async (req, res, next) => {
  const { slug } = req.params;
  const data = req.body;
  try {
    const updateCategoryRes = await updateCategoryService(data, slug);
    res.status(200).json(updateCategoryRes);
  } catch (error) {
    next(error);
  }
};
