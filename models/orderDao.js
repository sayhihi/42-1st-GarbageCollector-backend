const { appDataSource } = require("./appDataSource");

const prepareOrder = async (cartId, productOptionId, quantity) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
        ? AS cartId,
        ? AS quantity,
         po.id AS productOptionId,
         p.name AS productName,
         po.name AS productOptionName,
         p.price + po.extra_price AS productPriceBeforeDiscount,
         p.discount_price + po.extra_price AS productPriceAfterDiscount,
         ( p.price + po.extra_price ) * ? AS itemPriceBeforeDiscount,
         ( p.discount_price + po.extra_price ) * ? AS itemPriceAfterDiscount
      FROM product_options po
      JOIN products p ON p.id = po.product_id
      WHERE po.id = ?;
       `,
      [cartId, quantity, quantity, quantity, productOptionId]
    );

    return result;
  } catch (err) {
    const error = new Error("FAIL TO GET ITEM INFORMATION");
    error.statusCode = 400;
    throw error;
  }
};

const getItemPrice = async (productOptionId, quantity) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
        ( p.discount_price + po.extra_price ) * ? AS itemPriceAfterDiscount,
        ( p.price + po.extra_price ) * ? AS itemPriceBeforeDiscount
      FROM product_options po
      JOIN products p ON p.id = po.product_id
      WHERE po.id = ?
      `,
      [quantity, quantity, productOptionId]
    );

    return result;
  } catch (err) {
    const error = new Error("FAIL TO GET ITEM PRICE");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getItemPrice, prepareOrder };
