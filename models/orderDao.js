const { appDataSource } = require("./appDataSource");

const createOrderPayment = async (
  userId,
  receiver,
  address,
  phoneNumber,
  paymentMethod,
  totalPrice,
  productOptions,
  orderNumber
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const status = {
      orderCompleted: 1,
    };

    const paymentMethodOption = {
      point: 1,
      card: 2,
      cash: 3,
    };

    const createOrder = await queryRunner.query(
      `INSERT INTO orders
      (
        user_id,
        status_id, 
        order_number, 
        reciever, 
        address,
        phone_number, 
        payment_method_id, 
        total_price
      ) VALUES (
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?, 
        ?,
        ?
      );
      `,
      [
        userId,
        status["orderCompleted"],
        orderNumber,
        receiver,
        address,
        phoneNumber,
        paymentMethodOption[paymentMethod],
        totalPrice,
      ]
    );

    const orderId = createOrder.insertId;
    const productOption = productOptions.map((el) => {
      return [el.productOptionId, el.quantity, orderId];
    });

    const createOrderItems = await queryRunner.query(
      `INSERT INTO order_items
      (
        product_option_id,
        quantity,
        order_id
      ) VALUES ?;
      `,
      [productOption]
    );

    await queryRunner.query(
      `UPDATE points
      SET
      amount = amount - ${totalPrice}
      WHERE points.user_id = ?
      ;`,
      [userId]
    );

    for (let i = 0; i < productOptions.length; i++) {
      const getInfo = productOptions[i];
      await queryRunner.query(
        `UPDATE product_options
        SET
        inventory = inventory - ?
        WHERE product_options.id = ?;
        `,
        [getInfo.quantity, getInfo.productOptionId]
      );
    }

    const getCartId = productOptions.map((el) => {
      return [el.cartId];
    });
    for (let i = 0; i < getCartId.length; i++) {
      const cartId = getCartId[i];
      await queryRunner.query(
        `DELETE FROM
        carts
        WHERE carts.id = ?
        ;`,
        [cartId]
      );
    }
    await queryRunner.commitTransaction();
  } catch (err) {
    queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};
const prepareOrder = async (productOptionId, quantity) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
         po.id AS productOptionId,
         p.name AS productName,
         po.name AS productOptionName,
         p.price + po.extra_price AS productPriceBeforeDiscount,
         p.discount_price + po.extra_price AS productPriceAfterDiscount,
         ( p.price + po.extra_price ) * ? AS itemPriceBeforeDiscount,
         ( p.discount_price + po.extra_price ) * ? AS itemPriceAfterDiscount
      FROM product_options po
      JOIN products p ON p.id = po.product_id
      WHERE po.id = ?;
       `,
      [quantity, quantity, productOptionId]
    );

    return result;
  } catch (err) {
    const error = new Error("FAIL TO GET ITEM INFORMATION");
    error.statusCode = 400;
    throw error;
  }
};

const getItemPrice = async (productOptionId, quantity) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT 
        ( p.discount_price + po.extra_price ) * ? AS itemPriceAfterDiscount,
        ( p.price + po.extra_price ) * ? AS itemPriceBeforeDiscount
      FROM product_options po
      JOIN products p ON p.id = po.product_id
      WHERE po.id = ?
      `,
      [quantity, quantity, productOptionId]
    );

    return result;
  } catch (err) {
    const error = new Error("FAIL_TO_GET_ITEM_PRICE");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createOrderPayment,
  getItemPrice,
  prepareOrder,
};
