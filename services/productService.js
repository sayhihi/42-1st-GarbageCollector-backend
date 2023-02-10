const productDao = require("../models/productDao");

const getProducts = async (categoryId, sort) => {
  try {
    return productDao.getProducts(categoryId, sort);
  } catch (err) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 500;
    throw error;
  }
};

const getProductDetail = async (productId) => {
  try {
    return productDao.getProductDetail(productId);
  } catch (err) {
    const error = new Error("INVAILD_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductDetail,
};
