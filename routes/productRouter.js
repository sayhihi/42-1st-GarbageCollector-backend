const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getproducts);
router.get("/detail", productController.getProductDetail);

module.exports = {
  router,
};
