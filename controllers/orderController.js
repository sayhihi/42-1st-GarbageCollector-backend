const orderService = require("../services/orderService");

const createOrderPayment = async (req, res) => {
  const userId = req.user;
  try {
    const {
      receiver,
      address,
      phoneNumber,
      paymentMethod,
      totalPrice,
      productOptions,
    } = req.body;

    const createdOrderNumber = await orderService.createOrderPayment(
      userId,
      receiver,
      address,
      phoneNumber,
      paymentMethod,
      totalPrice,
      productOptions
    );
    return res.status(201).json({ message: createdOrderNumber });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const prepareOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { productOptions } = req.body;

    if (!productOptions) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const data = await orderService.prepareOrder(userId, productOptions);

    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { prepareOrder, createOrderPayment };
