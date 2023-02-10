const cartDao = require("../models/cartDao");

const createOrUpdateItem = async (userId, productOptionId, quantity) => {
  try {
    const itemsInCart = await cartDao.checkItemInCart(userId, productOptionId);
    const itemInventory = await cartDao.checkItemInventory(productOptionId);
    const cartQuantity = itemsInCart ? itemsInCart.quantity : 0;

    if (itemInventory < cartQuantity + quantity) {
      const err = new Error(`CANNOT PURCHSE MORE!`);
      throw err;
    }

    if (itemsInCart && itemsInCart.quantity + quantity <= 0) {
      const err = new Error(`CANNOT DECREASE QUANTITY BELOW 0`);
      err.statusCode = 400;
      throw err;
    }

    await cartDao.createOrUpdateItem(userId, productOptionId, quantity);
    return cartDao.checkItemInCart(userId, productOptionId);
  } catch (err) {
    throw err;
  }
};

const getItems = async (userId) => {
  try {
    return await cartDao.getItems(userId);
  } catch (err) {
    throw err;
  }
};

const deleteItems = async (userId, cartId) => {
  try {
    return await cartDao.deleteItems(userId, cartId);
  } catch (err) {
    throw err;
  }
};

module.exports = { createOrUpdateItem, getItems, deleteItems };
