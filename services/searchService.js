const searchDao = require("../models/searchDao");

const getSearchProducts = async (keyword) => {
  return searchDao.getSearchProducts(keyword);
};

module.exports = { getSearchProducts };
