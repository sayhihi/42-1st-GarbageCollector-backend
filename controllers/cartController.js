const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/error");

const createItem = catchAsync(async (req, res) => {
  const productOptions = req.body;
  const userId = req.user;

  if (!userId || !productOptions) {
    const err = new Error("KEY ERROR");
    err.statusCode = 400;
    throw err;
  }

  await cartService.createItem(userId, productOptions);

  return res.status(201).json({ message: `ITEM_SUCCESSFULLY_CREATED_IN_CART` });
});

const updateItem = catchAsync(async (req, res) => {
  const { productOptionId, quantity } = req.body;
  const userId = req.user;

  if (!userId || !productOptionId || !quantity) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const cartData = await cartService.createOrUpdateItem(
    userId,
    productOptionId,
    quantity
  );

  return res
    .status(201)
    .json({ message: `ITEM_SUCCESSFULLY_UPDATED_IN_CART`, cartData });
});

const getItems = catchAsync(async (req, res) => {
  const userId = req.user;

  if (!userId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const cartData = await cartService.getItems(userId);

  return res.status(200).json({ cartData });
});

const deleteItems = catchAsync(async (req, res) => {
  const userId = req.user;
  const { cartId } = req.query;

  if (!userId || !cartId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await cartService.deleteItems(userId, cartId);

  return res.status(200).json({ message: "ITEM_SUCCESSFULLY_DELETED" });
});

module.exports = {
  createItem,
  updateItem,
  getItems,
  deleteItems,
};
