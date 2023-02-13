const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const checkValidToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const err = new Error("NOT_EXIST_TOKEN");
      throw err;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userDao.checkRegistuserId(decoded.userId);
    if (!user) {
      const err = new Error("INVALID_TOKEN");
      err.statusCode = 400;
      throw err;
    }
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { checkValidToken };
