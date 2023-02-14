const express = require("express");
const { checkValidToken } = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/payment", checkValidToken, orderController.createOrderPayment);

module.exports = {
  router,
};
