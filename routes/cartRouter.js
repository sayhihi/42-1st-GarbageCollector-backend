const express = require("express");

const cartController = require("../controllers/cartController");
const { checkValidToken } = require("../middlewares/auth");

const router = express.Router();

router.post("", checkValidToken, cartController.createOrUpdateItem);
router.get("", checkValidToken, cartController.getItems);
router.delete("", checkValidToken, cartController.deleteItems);

module.exports = { router };
