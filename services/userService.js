const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const checkValidation = require("../utills/validation-check");

const signup = async (email, password, name, birth, phoneNumber, address) => {
  try {
    if (await userDao.checkRegisterdEmail(email)) {
      const err = new Error("ALREADY_EXCIST_EMAIL");
      throw err;
    }
    if (await userDao.checkRegisterdPhoneNumber(phoneNumber)) {
      const err = new Error("ALREADY_EXCIST_PHONE_NUMBER");
      throw err;
    }

    await checkValidation.checkValidationEmail(email);
    await checkValidation.checkValidationPassword(password);
    await checkValidation.checkValidationBirth(birth);
    await checkValidation.checkValidationPhoneNumber(phoneNumber);

    const hashedPassword = await bycrpt.hash(password, 12);

    return userDao.createUser(
      email,
      hashedPassword,
      name,
      birth,
      phoneNumber,
      address
    );
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const hashedPassword = await userDao.getUserPasswordByEmail(email);
    const checkHash = await bycrpt.compare(password, hashedPassword);

    if (!checkHash) {
      const err = new Error("WRONG_PASSWORD");
      err.statusCode = 400;
      throw err;
    }
    const currentTime = currentUtcKoreaTime();
    const ExpireTime = currentTime + 60 * 60 * 24;
    const userId = await userDao.checkRegisteruserId(email);
    const payload = {
      iss: "garbageCollectoOwner",
      sub: "garbageWorld",
      iat: currentTime,
      exp: ExpireTime,
      userId: userId,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

const currentUtcKoreaTime = () => {
  const currentTime = new Date().getTime() / 1000 + 60 * 60 * 9;
  return Math.floor(currentTime);
};

module.exports = {
  signup,
  login,
};
