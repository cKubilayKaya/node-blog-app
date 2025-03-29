import { deleteCommentService } from "../../services/comment/deleteCommentService.js";

export const deleteCommentController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await deleteCommentService(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
