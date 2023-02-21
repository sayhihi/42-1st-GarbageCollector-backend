const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const checkValidation = require("../utils/validation-check");

const signup = async (email, password, name, birth, phoneNumber, address) => {
  if (await userDao.checkRegisterdEmail(email)) {
    const err = new Error("ALREADY_EXCIST_EMAIL");
    err.statusCode = 400;
    throw err;
  }
  if (await userDao.checkRegisterdPhoneNumber(phoneNumber)) {
    const err = new Error("ALREADY_EXCIST_PHONE_NUMBER");
    err.statusCode = 400;
    throw err;
  }

  await checkValidation.checkValidationEmail(email);
  await checkValidation.checkValidationPassword(password);
  await checkValidation.checkValidationBirth(birth);
  await checkValidation.checkValidationPhoneNumber(phoneNumber);

  const hashedPassword = await bycrpt.hash(password, 12);

  const user = await userDao.createUser(
    email,
    hashedPassword,
    name,
    birth,
    phoneNumber,
    address
  );

  const POINT = 100000;

  await userDao.makeUserPoint(POINT, user.insertId);

  return user;
};

const login = async (email, password) => {
  const hashedPassword = await userDao.getUserPasswordByEmail(email);
  const checkHash = await bycrpt.compare(password, hashedPassword);

  if (!checkHash) {
    const err = new Error("WRONG_PASSWORD");
    err.statusCode = 400;
    throw err;
  }
  const currentTime = currentUtcKoreaTime();
  const ExpireTime = currentTime + 60 * 60 * 24;
  const userId = await userDao.getUserIdByEmail(email);
  const payload = {
    iss: "garbageCollectoOwner",
    sub: "garbageWorld",
    iat: currentTime,
    exp: ExpireTime,
    userId: userId,
  };
  return jwt.sign(payload, process.env.SECRET_KEY);
};

const currentUtcKoreaTime = () => {
  const currentTime = new Date().getTime() / 1000 + 60 * 60 * 9;
  return Math.floor(currentTime);
};

module.exports = {
  signup,
  login,
};
