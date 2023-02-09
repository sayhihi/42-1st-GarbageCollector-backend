const cartDao = require("../models/cartDao");

const addItem = async (userId, productOptionId, quantity) => {
  try {
    const itemsInCart = await cartDao.checkItemInCart(userId, productOptionId);
    const itemInventory = await cartDao.checkItemInventory(productOptionId);
    const cartQuantity = itemsInCart ? itemsInCart.quantity : 0;

    if (itemInventory < cartQuantity + quantity) {
      const err = new Error(`CANNOT PURCHSE MORE THAN ${itemInventory}`);
      throw err;
    }

    await cartDao.addItem(userId, productOptionId, quantity);
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

const updateItemQuantity = async (userId, productOptionId, updateQuantity) => {
  try {
    const itemsInCart = await cartDao.checkItemInCart(userId, productOptionId);
    const itemInventory = await cartDao.checkItemInventory(productOptionId);

    if (!itemsInCart) {
      const err = new Error(`CANNOT FOUND ITEM IN CART`);
      throw err;
    }

    if (itemInventory < itemsInCart.quantity + Number(updateQuantity)) {
      const err = new Error(`CANNOT PURCHSE MORE THAN ${itemInventory}`);
      throw err;
    }

    if (itemsInCart.quantity + Number(updateQuantity) <= 0) {
      await cartDao.updateItemQuantity(
        userId,
        productOptionId,
        1 - itemsInCart.quantity
      );
      const err = new Error(`CANNOT DECREASE QUANTITY BELOW 0`);
      throw err;
    }

    await cartDao.updateItemQuantity(userId, productOptionId, updateQuantity);
    return await cartDao.checkItemInCart(userId, productOptionId);
  } catch (err) {
    throw err;
  }
};

const deleteItems = async (userId, selectedItems) => {
  try {
    return await cartDao.deleteItems(userId, selectedItems);
  } catch (err) {
    throw err;
  }
};

module.exports = { addItem, getItems, updateItemQuantity, deleteItems };
