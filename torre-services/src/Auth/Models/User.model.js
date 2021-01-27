//Import the mongoose module
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * This is the default schema of User
 * username: From Torre
 * registrationDate: Here in this project
 * password: Password
 * currentToken: Current token for auth
 */
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now, required: true },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  theme: { type: String, default: "green500", required: true },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async function (username, password) {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw { message: "User not found!", internalCode: 1400 };
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw { message: "Invalid password!", internalCode: 1400 };
  }
  return user;
};

//    Export
const UserModel = model("users", UserSchema);
module.exports = UserModel;
