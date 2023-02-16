const productDao = require("../models/productDao");

const getProducts = async (categoryId, sort) => {
  return productDao.getProducts(categoryId, sort);
};

const getProductDetail = async (productId) => {
  return productDao.getProductDetail(productId);
};

module.exports = {
  getProducts,
  getProductDetail,
};
