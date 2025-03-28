import { updatePostService } from "../../services/post/updatePostService.js";

export const updatePostController = async (req, res, next) => {
  const { slug } = req.params;
  const data = req.body;
  try {
    const updatePostRes = await updatePostService(data, slug);
    res.status(200).json(updatePostRes);
  } catch (error) {
    next(error);
  }
};
