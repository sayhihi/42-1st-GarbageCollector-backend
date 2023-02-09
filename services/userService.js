const bycrpt = require("bcrypt");

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

    const costFactor = 12;
    const makeHash = async (password, costFactor) => {
      return await bycrpt.hash(password, costFactor);
    };
    const hashedPassword = await makeHash(password, costFactor);

    const createUser = await userDao.createUser(
      email,
      hashedPassword,
      name,
      birth,
      phoneNumber,
      address
    );
    return createUser;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  signup,
};
