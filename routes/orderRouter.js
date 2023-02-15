const express = require("express");
const router = express.Router();
const { checkValidToken } = require("../middlewares/auth");

const orderController = require("../controllers/orderController");

router.post("/orderform", checkValidToken, orderController.prepareOrder);

module.exports = {
  router,
};
