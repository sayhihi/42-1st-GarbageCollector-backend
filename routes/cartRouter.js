const express = require("express");

const cartController = require("../controller/cartController");

const router = express.Router();

router.post("", cartController.addItem);
router.get("", cartController.getItems);
router.patch("", cartController.updateItemQuantity);
router.delete("", cartController.deleteItems);

module.exports = { router };
