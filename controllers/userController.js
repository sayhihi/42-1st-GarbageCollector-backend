const { catchAsync } = require("../utills/error");
const userService = require("../services/userService");

const signup = catchAsync(async (req, res) => {
  const { email, password, name, birth, phoneNumber, address } = req.body;
  if (!email || !password || !name || !birth || !phoneNumber) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await userService.signup(email, password, name, birth, phoneNumber, address);
  return res.status(201).json({ message: "SUCCESS_SIGNUP" });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  const accessToken = await userService.login(email, password);
  return res.status(200).json({ accessToken });
});

module.exports = {
  signup,
  login,
};
