import { createCommentService } from "../../services/comment/createCommentService.js";

export const createCommentController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const data = req.body;
  try {
    const response = await createCommentService(data, token);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
