import { createCategoryService } from "../../services/category/createCategoryService.js";

export const createCategoryController = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const createCategoryRes = await createCategoryService(name, description);
    res.status(201).json(createCategoryRes);
  } catch (error) {
    next(error);
  }
};
