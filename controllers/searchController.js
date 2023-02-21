const searchService = require("../services/searchService");
const { catchAsync } = require("../utils/error");

const getSearchByProducts = catchAsync(async (req, res) => {
  const { keyword } = req.query;
  const searchProducts = await searchService.getSearchProducts(keyword);
  return res.status(200).json({ data: searchProducts });
});

module.exports = { getSearchByProducts };
