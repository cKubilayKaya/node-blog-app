import { uniquePostService } from "../../services/post/uniquePostService.js";
import { uniquePostWithUserLikesService } from "../../services/post/uniquePostWithUserLikesService.js";

export const uniquePostController = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
  const { comments = false } = req.query;
  const { slug } = req.params;
  try {
    let response;
    if (token) {
      response = await uniquePostWithUserLikesService(slug, comments, token);
    } else {
      response = await uniquePostService(slug, comments);
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
