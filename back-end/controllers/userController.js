const usersModels = require("../models/usersModels");
const jwt = require("jsonwebtoken");

//Arguments are part of the payload for the token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersModels.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersModels.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

module.exports = { userLogin, userSignup };
