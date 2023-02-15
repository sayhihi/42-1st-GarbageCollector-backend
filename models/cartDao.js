const { appDataSource } = require("./appDataSource");

const getItems = async (userId) => {
  try {
    return appDataSource.query(
      `SELECT 
        c.user_id AS userId,
        c.id AS cartId,
        c.user_id AS userId,
        p.id AS productId,
        c.product_option_id AS productOptionId,
        p.name AS productName,
        p.main_image AS productMainImage,
        p.price AS productPrice,
        p.discount_price AS productDiscountPrice,
        po.name AS productOptionName,
        po.extra_price AS productOptionExtraPrice,
        p.discount_price + po.extra_price AS productTotalPrice,
        po.inventory AS inventory,
        c.quantity AS quantity,
        ((p.discount_price + po.extra_price ) * c.quantity) AS productTotalPriceWithQuantity
      FROM carts c
      JOIN product_options po ON c.product_option_id = po.id
      JOIN products p ON po.product_id = p.id
      WHERE user_id = ?
      ORDER BY c.id DESC;
      `,
      [userId]
    );
  } catch (err) {
    err.message = "FAIL TO GET ITEMS IN CART";
    err.statuscode = 500;
    throw err;
  }
};

const createOrUpdateItem = async (userId, productOptionId, quantity) => {
  try {
    return appDataSource.query(
      `INSERT INTO carts
        (
          user_id,
          product_option_id,
          quantity
        )
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        quantity = quantity + ${quantity}
      `,
      [userId, productOptionId, quantity]
    );
  } catch (err) {
    err.message = "FAIL TO ADD ITEM IN CART";
    err.statuscode = 500;
    throw err;
  }
};

const deleteItems = async (userId, cartId) => {
  try {
    const deleteItems = await appDataSource.query(
      `DELETE FROM carts
        WHERE user_id = ? 
        AND id IN (?);
      `,
      [userId, cartId]
    );
    if (!deleteItems.affectedRows) throw err;
  } catch (err) {
    err.message = "FAIL TO DELETE ITEM IN CART";
    err.statuscode = 500;
    throw err;
  }
};

const checkItemInCart = async (userId, productOptionId) => {
  try {
    const [itemInCart] = await appDataSource.query(
      `SELECT 
        c.quantity AS quantity,
        ((p.discount_price + po.extra_price ) * c.quantity) AS productTotalPriceWithQuantity
        FROM carts c
        JOIN product_options po ON c.product_option_id = po.id
        JOIN products p ON po.product_id = p.id
        WHERE c.user_id = ? AND c.product_option_id = ?
        ORDER BY p.id, po.id;
      `,
      [userId, productOptionId]
    );

    return itemInCart;
  } catch (err) {
    err.message = "FAIL TO CHECK ITEMS IN CART";
    err.statuscode = 500;
    throw err;
  }
};

const checkItemInventory = async (productOptionId) => {
  try {
    const [itemInventory] = await appDataSource.query(
      `SELECT 
        inventory
        FROM product_options
        WHERE id = ?;
      `,
      [productOptionId]
    );

    return itemInventory.inventory;
  } catch (err) {
    err.message = "FAIL TO CHECK ITEM INVENTORY";
    err.statuscode = 500;
    throw err;
  }
};

module.exports = {
  getItems,
  createOrUpdateItem,
  deleteItems,
  checkItemInCart,
  checkItemInventory,
};
