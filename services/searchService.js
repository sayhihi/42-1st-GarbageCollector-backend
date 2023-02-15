const searchDao = require("../models/searchDao");

const getSearchProducts = async (keyword) => {
  try {
    return searchDao.getSearchProducts(keyword);
  } catch (err) {
    console.error(err);
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { getSearchProducts };
