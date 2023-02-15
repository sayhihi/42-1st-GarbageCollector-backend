const uuid = require("uuid");

const orderDao = require("../models/orderDao");
const productDao = require("../models/productDao");
const userDao = require("../models/userDao");

const DELIVERY_FEE = 3000;

const createOrderPayment = async (
  userId,
  receiver,
  address,
  phoneNumber,
  paymentMethod,
  totalPrice,
  productOptions
) => {
  try {
    for (let i = 0; i < productOptions.length; i++) {
      const getInventory = await productDao.getInventoryByProductOptionId(
        productOptions[i].productOptionId
      );
      const inventory = getInventory.inventory;
      const quantity = productOptions[i].quantity;
      if (quantity > inventory) {
        throw new Error("INVENTROY_QUANTITY_EXCEEDED");
      }
    }
    const IsUserPointMoreThanTotalPrice = await userDao.getUserPoint(userId);
    const points = IsUserPointMoreThanTotalPrice[0].amount;
    const { checkTotalPrice } = await getTotalPrice(productOptions);

    if (Number(totalPrice) !== checkTotalPrice) {
      throw new Error("THE_TOTAL_PRICES_DO_NOT_MATCH");
    }

    if (Number(totalPrice) > Number(points)) {
      throw new Error("TOTALPRICE_EXCEEDED_POINTS");
    }
    const orderNumber = uuid.v4();

    await orderDao.createOrderPayment(
      userId,
      receiver,
      address,
      phoneNumber,
      paymentMethod,
      totalPrice,
      productOptions,
      orderNumber
    );

    return orderNumber;
  } catch (err) {
    throw err;
  }
};

const prepareOrder = async (userId, productOptions) => {
  try {
    const userPoint = await userDao.getUserPoint(userId);

    let itemsInfo = [];
    for (i = 0; i < productOptions.length; i++) {
      const itemInfo = await orderDao.prepareOrder(
        productOptions[i].productOptionId,
        productOptions[i].quantity
      );
      itemInfo.cartId = productOptions[i].cartId;
      itemInfo.quantity = productOptions[i].quantity;
      itemsInfo.push(itemInfo);
    }

    const {
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
      deleveryFee,
      checkTotalPrice,
      discount,
    } = await getTotalPrice(productOptions);

    return {
      userPoint,
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
      discount,
      deleveryFee,
      checkTotalPrice,
      productOptions: itemsInfo,
    };
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
  const checkTotalPrice = totalPriceAfterDiscount + deleveryFee;
  const discount = totalPriceBeforeDiscount - totalPriceAfterDiscount;

  return {
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    deleveryFee,
    checkTotalPrice,
    discount,
  };
};

module.exports = {
  createOrderPayment,
  prepareOrder,
};
