const orderDao = require("../models/orderDao");
const userDao = require("../models/userDao");
const DELIVERY_FEE = 3000;

const prepareOrder = async (userId, productOptions) => {
  try {
    const userPoint = await userDao.getUserPoint(userId);

    let itemsInfo = [];
    for (i = 0; i < productOptions.length; i++) {
      const itemInfo = await orderDao.prepareOrder(
        productOptions[i].cartId,
        productOptions[i].productOptionId,
        productOptions[i].quantity
      );
      itemsInfo.push(itemInfo);
    }

    const {
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
      deleveryFee,
      totalPrice,
      discount,
    } = await getTotalPrice(productOptions);

    const data = {
      userPoint,
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
      discount,
      deleveryFee,
      totalPrice,
      itemsInfo,
    };

    return data;
  } catch (err) {
    throw err;
  }
};

const getTotalPrice = async (productOptions) => {
  let totalPriceBeforeDiscount = 0;
  let totalPriceAfterDiscount = 0;
  for (i = 0; i < productOptions.length; i++) {
    const data = await orderDao.getItemPrice(
      productOptions[i].productOptionId,
      productOptions[i].quantity
    );
    totalPriceAfterDiscount += Number(data.itemPriceAfterDiscount);
    totalPriceBeforeDiscount += Number(data.itemPriceBeforeDiscount);
  }

  const deleveryFee = totalPriceAfterDiscount < 30000 ? DELIVERY_FEE : 0;
  const totalPrice = totalPriceAfterDiscount + deleveryFee;
  const discount = totalPriceBeforeDiscount - totalPriceAfterDiscount;

  return {
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    deleveryFee,
    totalPrice,
    discount,
  };
};

module.exports = { prepareOrder };
