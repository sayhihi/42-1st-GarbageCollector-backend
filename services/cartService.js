const cartDao = require("../models/cartDao");

const createOrUpdateItem = async (userId, productOptionId, quantity) => {
  const itemsInCart = await cartDao.checkItemInCart(userId, productOptionId);
  const itemInventory = await cartDao.checkItemInventory(productOptionId);
  const cartQuantity = itemsInCart ? itemsInCart.quantity : 0;

  if (itemInventory < cartQuantity + quantity) {
    const err = new Error(`CANNOT_PURCHSE_MORE!`);
    err.statusCode = 400;
    throw err;
  }

  if (itemsInCart && itemsInCart.quantity + quantity <= 0) {
    const err = new Error(`CANNOT_DECREASE_QUANTITY_BELOW_0`);
    err.statusCode = 400;
    throw err;
  }

  await cartDao.createOrUpdateItem(userId, productOptionId, quantity);

  const cartData = await cartDao.getItems(userId);
  const deliveryFee = await calculateDeliveryFee(cartData);

  const checkItemInCart = await cartDao.checkItemInCart(
    userId,
    productOptionId
  );
  checkItemInCart.deliveryFee = deliveryFee;

  return checkItemInCart;
};

const getItems = async (userId) => {
  const cart = await cartDao.getItems(userId);

  const deliveryFee = await calculateDeliveryFee(cart);
  const cartItems = { cartItems: cart };
  cartItems.deliveryFee = deliveryFee;

  return cartItems;
};

const deleteItems = async (userId, cartId) => {
  return await cartDao.deleteItems(userId, cartId);
};

const calculateDeliveryFee = async (cartData) => {
  const DELIVERY_FEE = 3000;

  let cartSum = 0;
  cartData.forEach((el) => {
    cartSum = cartSum + Number(el.productTotalPriceWithQuantity);
  });
  const deliveryFee = cartSum < 30000 ? DELIVERY_FEE : 0;

  return deliveryFee;
};

module.exports = { createOrUpdateItem, getItems, deleteItems };
