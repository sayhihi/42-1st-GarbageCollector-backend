const orderService = require("../services/orderService");
const { catchAsync } = require("../utills/error");

const prepareOrder = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productOptions } = req.body;

  if (!productOptions) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await orderService.prepareOrder(userId, productOptions);

  return res.status(200).json({ data });
});

module.exports = { prepareOrder };
