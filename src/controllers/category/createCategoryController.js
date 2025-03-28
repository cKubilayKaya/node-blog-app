import { createCategoryService } from "../../services/category/createCategoryService.js";

export const createCategoryController = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const response = await createCategoryService(name, description);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
