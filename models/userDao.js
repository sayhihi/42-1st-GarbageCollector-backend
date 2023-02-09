const { appDataSource } = require("./appDataSource");

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

const checkRegisterdEmail = async (email) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS(
          SELECT
          id
        FROM
          users
        WHERE
          email=?
      ) as registed`,
      [email]
    );
    return !!parseInt(result.registed);
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

const checkRegisterdPhoneNumber = async (phoneNumber) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT
          id
        FROM
          users
        WHERE
          phone_number=?
      ) as registed`,
      [phoneNumber]
    );
    return !!parseInt(result.registed);
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};
module.exports = {
  createUser,
  checkRegisterdEmail,
  checkRegisterdPhoneNumber,
};
