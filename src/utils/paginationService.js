import prisma from "./prisma.js";

export default async function paginationService(model, page, limit) {
  const totalItems = await prisma[model].count();
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    totalPages: totalPages,
    totalItems: totalItems,
    limit: limit,
  };
}
