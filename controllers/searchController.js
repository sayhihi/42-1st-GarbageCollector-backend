const searchService = require("../services/searchService");

const getSearchByProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const searchProducts = await searchService.getSearchProducts(keyword);
    return res.status(200).json({ data: searchProducts });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getSearchByProducts };
