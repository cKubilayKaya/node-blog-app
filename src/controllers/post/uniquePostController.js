import { uniquePostService } from "../../services/post/uniquePostService.js";

export const uniquePostController = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const uniquePostRes = await uniquePostService(slug);
    res.status(200).json(uniquePostRes);
  } catch (error) {
    next(error);
  }
};
