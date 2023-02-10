const userService = require("../services/userService");

const signup = async (req, res) => {
  try {
    const { email, password, name, birth, phoneNumber, address } = req.body;
    if (!email || !password || !name || !birth || !phoneNumber) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userService.signup(
      email,
      password,
      name,
      birth,
      phoneNumber,
      address
    );
    return res.status(201).json({ message: "SUCCESS_SIGNUP" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (res, req) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userService.login(email, password);
    return res.status(200).json({ message: "SUCCESS_LOGIN" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
};
