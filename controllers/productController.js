const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const { categoryId, sort } = req.query;
    const lists = await productService.getProducts(categoryId, sort);
    return res.status(200).json({ data: lists });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetail = await productService.getProductDetail(productId);
    return res.status(200).json({ data: productDetail });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
};
