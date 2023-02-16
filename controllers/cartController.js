const cartService = require("../services/cartService");

const createItem = async (req, res) => {
  try {
    const { productOptions } = req.body;
    const userId = req.user;

    if (!userId || !productOptions) {
      const err = new Error("KEY ERROR");
      err.statusCode = 400;
      throw err;
    }

    for (i = 0; i < productOptions.length; i++) {
      await cartService.createOrUpdateItem(
        userId,
        productOptions[i].productOptionId,
        productOptions[i].quantity
      );
    }

    res.status(201).json({ message: `ITEM SUCCESSFULLY CREATED IN CART` });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { productOptionId, quantity } = req.body;
    const userId = req.user;

    if (!userId || !productOptionId || !quantity) {
      const err = new Error("KEY ERROR");
      err.statusCode = 400;
      throw err;
    }

    const cartData = await cartService.createOrUpdateItem(
      userId,
      productOptionId,
      quantity
    );

    res
      .status(201)
      .json({ message: `ITEM SUCCESSFULLY UPDATED IN CART`, cartData });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getItems = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      const err = new Error("KEY ERROR");
      err.statusCode = 400;
      throw err;
    }

    const cartData = await cartService.getItems(userId);

    res.status(200).json({ cartData });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteItems = async (req, res) => {
  try {
    const userId = req.user;
    const { cartId } = req.query;

    if (!userId || !cartId) {
      const err = new Error("KEY ERROR");
      throw err;
    }

    await cartService.deleteItems(userId, cartId);

    res.status(200).json({ message: "ITEM SUCCESSFULLY DELETED" });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createItem,
  updateItem,
  getItems,
  deleteItems,
};
