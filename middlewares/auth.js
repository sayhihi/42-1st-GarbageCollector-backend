const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const checkValidToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const err = new Error("NOT_EXIST_TOKEN");
      throw err;
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await userDao.checkRegisteruserId(decoded.userId);
    if (!user) {
      const err = new Error("INVALID_TOKEN");
      err.statusCode = 400;
      throw err;
    }
    req.user = decoded.userId;
    next();
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

module.exports = { checkValidToken };
