const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { createdAt: true }
);

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (!email || !password) {
    throw Error("All fields are required");
  } else if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  } else if (exists) {
    throw Error("Email already exists");
  } else {
    const mysalt = await bcrypt.genSalt(20);
    const hash = await bcrypt.hash(password, mysalt);

    const user = await this.create({ email, password: hash });
    return user;
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email or password");
  }
  //compare passwords
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
