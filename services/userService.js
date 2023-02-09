const userDao = require("../models/userDao");
const bycrpt = require("bcrypt");
const constraints = require("../utills/constraints");
const constants = require("../utills/constants");

//회원가입
const signup = async (email, password, name, birth, phoneNumber, address) => {
  try {
    //유저 이메일 중복 에러발생
    if (await userDao.getIdByUserEmail(email)) {
      const err = new Error("ALREADY_EXCIST_EMAIL");
      throw err;
    }
    //유저 핸드폰번호 중복 에러발생
    if (await userDao.getIdByUserPhoneNumber(phoneNumber)) {
      const err = new Error("ALREADY_EXCIST_PHONE_NUMBER");
      throw err;
    }

    //이메일 정규표현식(@, .(dot) 강제포함)
    //유저회원가입 비밀번호 제약
    const emailConstraint = new RegExp(constraints.EMAIL_REGEX);
    if (!emailConstraint.test(email)) {
      const err = new Error("INVALID_EMAIL");
      err.statusCode = 400;
      throw err;
    }
    //비밀번호 정규표현식(영문,숫자 조합으로 8자 이상 20자 이하)
    const pwConstraint = new RegExp(constraints.PASSWORD_REGEX);
    if (!pwConstraint.test(password)) {
      const err = new Error("INVALID_PASSWORD");
      err.statusCode = 400;
      throw err;
    }
    //bycrpt를 이용한 비밀번호 암호화
    const makeHash = async (password, costFactor) => {
      return await bycrpt.hash(password, costFactor);
    };
    const hashedPassword = await makeHash(password, constants.costFactor);

    //유저 가입완료
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
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  signup,
};
