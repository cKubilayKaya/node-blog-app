import { createPostService } from "../../services/post/createPostService.js";

export const createPostController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const data = req.body;
  try {
    const createCategoryRes = await createPostService(data, token);
    res.status(201).json(createCategoryRes);
  } catch (error) {
    next(error);
  }
};
