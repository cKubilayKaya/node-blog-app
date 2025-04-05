import Joi from "joi";

export const uuidSchema = () =>
  Joi.string().uuid().required().messages({
    "string.base": "ID must be a string",
    "string.uuid": "Please provide a valid UUID",
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  });

export const usernameSchema = () =>
  Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than 30 characters",
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  });

export const fullnameValidation = () =>
  Joi.string().min(3).max(50).allow("").messages({
    "string.base": "Full name must be a string",
    "string.min": "Full name must be at least 3 characters long",
    "string.max": "Full name must be less than 50 characters",
  });

export const passwordSchema = () =>
  Joi.string().min(6).max(30).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must be less than 30 characters",
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  });

export const rePasswordSchema = () =>
  Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Please confirm your password",
    "string.empty": "RePassword cannot be empty",
  });

export const emailValidation = () =>
  Joi.string().email().min(3).max(30).required().messages({
    "string.base": "Email must be a string",
    "string.email": "Please provide a valid email address",
    "string.min": "Email must be at least 3 characters long",
    "string.max": "Email must be less than 30 characters",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  });

export const verificationCode = () =>
  Joi.string().min(6).max(6).required().messages({
    "string.base": "Code must be a string",
    "string.min": "Code must be at least 6 characters long",
    "string.max": "Code must be less than 6 characters",
    "any.required": "Code is required",
    "string.empty": "Code cannot be empty",
  });

export const categoryNameSchema = () =>
  Joi.string().min(3).max(50).required().messages({
    "string.base": "Category name must be a string",
    "string.min": "Category name must be at least 3 characters long",
    "string.max": "Category name must be less than 50 characters",
    "any.required": "Category name is required",
    "string.empty": "Category name cannot be empty",
  });

export const updateCategoryNameSchema = () =>
  Joi.string().min(3).max(200).allow("").messages({
    "string.base": "Category name must be a string",
    "string.min": "Category name must be at least 3 characters long",
    "string.max": "Category name must be less than 200 characters",
  });

export const categorySlugSchema = () =>
  Joi.string().min(3).max(200).allow("").messages({
    "string.base": "Category slug must be a string",
    "string.min": "Category slug must be at least 3 characters long",
    "string.max": "Category slug must be less than 200 characters",
  });

export const categoryDescriptionSchema = () =>
  Joi.string().min(3).max(500).allow("").messages({
    "string.base": "Category description must be a string",
    "string.min": "Category description must be at least 3 characters long",
    "string.max": "Category description must be less than 500 characters",
  });

// POST CREATE
export const postTitleSchema = () =>
  Joi.string().min(3).max(200).required().messages({
    "string.base": "Post title must be a string",
    "string.min": "Post title must be at least 3 characters long",
    "string.max": "Post title must be less than 50 characters",
    "any.required": "Post title is required",
    "string.empty": "Post title cannot be empty",
  });

export const postContentSchema = () =>
  Joi.string().required().messages({
    "string.base": "Post content must be a string",
    "any.required": "Post content is required",
    "string.empty": "Post content cannot be empty",
  });

export const postSlugSchema = () =>
  Joi.string().min(3).max(200).allow("").messages({
    "string.base": "Post slug must be a string",
    "string.min": "Post slug must be at least 3 characters long",
    "string.max": "Post slug must be less than 200 characters",
  });

export const categoryIdsSchema = () =>
  Joi.array()
    .items(
      Joi.string()
        .uuid({ version: ["uuidv4"] })
        .messages({
          "string.base": "Category ID must be a string",
          "string.guid": "Category ID must be a valid UUID",
          "string.empty": "Category ID cannot be empty",
        })
    )
    .optional()
    .min(1)
    .messages({
      "array.base": "Category IDs must be an array",
      "array.min": "At least one category ID must be provided if the field is present",
    });

export const featuredImageUrlSchema = () =>
  Joi.string().optional().allow(null, "").messages({
    "string.base": "Featured image URL must be a string",
    "string.empty": "Featured image URL cannot be just an empty string (use null or omit if not needed)",
  });

export const excerptSchema = () =>
  Joi.string().max(500).optional().allow(null, "").messages({
    "string.base": "Excerpt must be a string",
    "string.max": "Excerpt must be less than or equal to 500 characters",
    "string.empty": "Excerpt cannot be just an empty string (use null or omit if not needed)",
  });

// POST UPDATE

export const updatePostTitleSchema = () =>
  Joi.string().min(3).max(200).allow("").messages({
    "string.base": "Post title must be a string",
    "string.min": "Post title must be at least 3 characters long",
    "string.max": "Post title must be less than 50 characters",
  });

export const updatePostContentSchema = () =>
  Joi.string().allow("").messages({
    "string.base": "Post content must be a string",
  });

// COMMENT CREATE

export const commentContentSchema = () =>
  Joi.string().min(3).max(500).required().messages({
    "string.base": "Comment content must be a string",
    "string.min": "Comment content must be at least 3 characters long",
    "string.max": "Comment content must be less than 500 characters",
    "any.required": "Comment content is required",
    "string.empty": "Comment content cannot be empty",
  });

export const commentPostIdSchema = () =>
  Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "string.base": "Post ID must be a string",
    "string.guid": "Invalid Post ID format",
    "any.required": "Post ID is required",
    "string.empty": "Post ID cannot be empty",
  });
