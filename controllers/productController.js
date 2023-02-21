const productService = require("../services/productService");
const { catchAsync } = require("../utils/error");

const getProducts = catchAsync(async (req, res) => {
  const { categoryId, sort } = req.query;
  const lists = await productService.getProducts(categoryId, sort);
  return res.status(200).json({ data: lists });
});

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productDetail = await productService.getProductDetail(productId);
  return res.status(200).json({ data: productDetail });
});

module.exports = {
  getProducts,
  getProductDetail,
};
