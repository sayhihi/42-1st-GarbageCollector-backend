const orderService = require("../services/orderService");
const { catchAsync } = require("../utills/error");

const createOrderPayment = catchAsync(async (req, res) => {
  const userId = req.user;
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
});

const prepareOrder = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productOptions } = req.body;

  if (!productOptions) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await orderService.prepareOrder(userId, productOptions);

  return res.status(200).json({ data });
});

module.exports = { prepareOrder, createOrderPayment };
