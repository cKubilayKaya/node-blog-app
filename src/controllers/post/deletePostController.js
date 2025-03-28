import { deletePostService } from "../../services/post/deletePostService.js";

export const deletePostController = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const deletePostRes = await deletePostService(slug);
    res.status(200).json(deletePostRes);
  } catch (error) {
    next(error);
  }
};
