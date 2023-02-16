const { appDataSource } = require("./appDataSource");

const getSearchProducts = async (keyword) => {
  try {
    return appDataSource.query(
      `SELECT
        p.id AS productId,
        p.name AS productName,
        p.main_image AS mainImage,
        p.sub_image AS subImage,
        p.price,
        p.discount_price AS discountPrice,
        p.create_at AS createAt
      FROM
        products p
      WHERE
        p.name LIKE "%${keyword}%"
      or
        p.price LIKE "%${keyword}%"
      or
        p.discount_price LIKE "%${keyword}%"
      or
        p.description LIKE "%${keyword}%"
      or
        p.model_number LIKE "%${keyword}%"`
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

module.exports = { getSearchProducts };
