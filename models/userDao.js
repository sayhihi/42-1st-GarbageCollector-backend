const { appDataSource } = require("./appDataSource");
//유저 생성
const createUser = async (
  email,
  password,
  name,
  birth,
  phoneNumber,
  address
) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
          email,
          password,
          name,
          birth,
          phone_number,
          address)
      VALUES(
          ?,?,?,?,?,?
      )`,
      [email, password, name, birth, phoneNumber, address]
    );
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

//유저 이메일 중복 확인
const getIdByUserEmail = async (email) => {
  try {
    const [userId] = await appDataSource.query(
      `SELECT
        id
      FROM
        users
      WHERE
        email=?
      `,
      [email]
    );
    if (userId) return userId.id;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

//유저 폰번호 중복 확인
const getIdByUserPhoneNumber = async (phoneNumber) => {
  try {
    const [userId] = await appDataSource.query(
      `SELECT
        id
      FROM
        users
      WHERE
        phone_number=?
      `,
      [phoneNumber]
    );
    if (userId) return userId.id;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};
module.exports = {
  createUser,
  getIdByUserEmail,
  getIdByUserPhoneNumber,
};
