import { updatePostService } from "../../services/post/updatePostService.js";

export const updatePostController = async (req, res, next) => {
  const { slug } = req.params;
  const data = req.body;

  if (req.file) {
    data.featuredImageUrl = `/uploads/posts/${req?.file?.filename}`;
  } else {
    data.featuredImageUrl = null;
  }

  try {
    const response = await updatePostService(data, slug);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
