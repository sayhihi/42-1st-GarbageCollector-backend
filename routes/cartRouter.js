const express = require("express");

const cartController = require("../controller/cartController");

const router = express.Router();

router.post("", cartController.createOrUpdateItem);
router.get("", cartController.getItems);
router.delete("", cartController.deleteItems);

module.exports = { router };
