const productDao = require("../models/productDao");

const getproducts = async (categoryId, sort) => {
  try {
    return await productDao.getproducts(categoryId, sort);
  } catch (err) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 500;
    throw error;
  }
};

const getProductDetail = async (productId) => {
  try {
    return await productDao.getProductDetail(productId);
  } catch (err) {
    const error = new Error("INVAILD_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getproducts,
  getProductDetail,
};
