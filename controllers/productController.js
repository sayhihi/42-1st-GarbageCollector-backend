const productService = require("../services/productService");

const getproducts = async (req, res) => {
  try {
    const { categoryId, sort } = req.query;
    const lists = await productService.getproducts(categoryId, sort);
    res.status(200).json({ data: lists });
    return lists;
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.query;
    const productDetail = await productService.getProductDetail(productId);
    res.status(200).json({ data: productDetail });
    return productDetail;
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getproducts,
  getProductDetail,
};
