const checkValidationEmail = (email) => {
  const EMAIL_REGEX = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  );
  if (!EMAIL_REGEX.test(email)) {
    const err = new Error("INVALID_EMAIL");
    err.statusCode = 400;
    throw err;
  }
};

const checkValidationPassword = (password) => {
  const PASSWORD_REGEX = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,20})");
  if (!PASSWORD_REGEX.test(password)) {
    const err = new Error("INVALID_PASSWORD");
    err.statusCode = 400;
    throw err;
  }
};

const checkValidationBirth = (bitrh) => {
  const BIRTH_REGEX = new RegExp(
    /^(19[0-9][0-9]|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  );
  if (!BIRTH_REGEX.test(bitrh)) {
    const err = new Error("INVALID_BIRTHDAY");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  checkValidationEmail,
  checkValidationPassword,
  checkValidationBirth,
};
