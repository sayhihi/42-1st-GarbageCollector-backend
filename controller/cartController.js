const cartService = require("../service/cartService");

const addItem = async (req, res) => {
  try {
    const { userId, productOptionId, quantity } = req.body;

    if (!userId || !productOptionId || quantity <= 0) {
      const err = new Error("KEY ERROR");
      throw err;
    }

    await cartService.addItem(userId, productOptionId, quantity);

    res.status(201).json({ message: `ITEM SUCCESSFULLY ADDED IN CART` });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getItems = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      const err = new Error("KEY ERROR");
      throw err;
    }

    const cartData = await cartService.getItems(userId);

    res.status(200).json({ cartData });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const { userId, productOptionId, updateQuantity } = req.body;

    if (!userId || !productOptionId || !updateQuantity) {
      const err = new Error("KEY ERROR");
      throw err;
    }

    const updatedItem = await cartService.updateItemQuantity(
      userId,
      productOptionId,
      updateQuantity
    );

    res.status(200).json({
      updatedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteItems = async (req, res) => {
  try {
    const { userId, selectedItems } = req.body;

    if (!userId || !selectedItems[0]) {
      const err = new Error("KEY ERROR");
      throw err;
    }

    await cartService.deleteItems(userId, selectedItems);

    res.status(200).json({ message: "ITEM SUCCESSFULLY DELETED" });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  addItem,
  getItems,
  updateItemQuantity,
  deleteItems,
};
