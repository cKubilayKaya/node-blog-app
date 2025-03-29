import excludeFieldsFromArray from "../../utils/excludeFieldsFromArray.js";
import { isUserExist } from "../../utils/isUserExist.js";

export const findUserService = async (username) => {
  const includeObject = {
    include: {
      posts: true,
      likes: {
        include: {
          post: {
            include: {
              author: {
                select: {
                  id: true,
                  email: true,
                  fullname: true,
                  username: true,
                },
              },
            },
          },
        },
      },
    },
  };

  const user = await isUserExist({ key: "username", value: username }, true, includeObject);

  const excludeFileds = ["password"];
  const filteredUser = excludeFieldsFromArray(excludeFileds, user);

  return { success: true, user: filteredUser };
};
