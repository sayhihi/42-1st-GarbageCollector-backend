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

const checkRegisteruserId = async (userId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT
          id
        FROM
          users
        WHERE
          id=?
      ) as registed`,
      [userId]
    );
    return !!parseInt(result.registed);
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

const getUserPasswordByEmail = async (email) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT
        password
      FROM
        users
      WHERE
        email=?
      `,
      [email]
    );
    return result.password;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

const getUserIdByEmail = async (email) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT
        id
      FROM
        users
      WHERE
        email=?
      `,
      [email]
    );
    return result.id;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    throw err;
  }
};

const getUserPoint = async (userId) => {
  const result = await appDataSource.query(
    `SELECT
    amount
    FROM points
    WHERE points.user_id = ?;`,
    [userId]
  );
  return result;
};

module.exports = {
  createUser,
  checkRegisterdEmail,
  checkRegisterdPhoneNumber,
  getUserPasswordByEmail,
  checkRegisteruserId,
  getUserIdByEmail,
  getUserPoint,
};
