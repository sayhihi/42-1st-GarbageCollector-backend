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
module.exports = {
  createOrderPayment,
};
