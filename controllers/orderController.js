const orderService = require("../services/orderService");

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

module.exports = { prepareOrder };
