//  Import the User Model to Auth
const UserModel = require("../Models/User.model");

/**
 * This fuction recieve a validated user and Stores it in the persistence
 * @param {User} newUser as the User Object
 */
const registerNewUser = async (newUser) => {
  try {
    const userModel = new UserModel(newUser);
    const result = await userModel.save();
    return result;
  } catch (error) {
    //  Database verifies if the user already exists
    if (error.code === 11000)
      throw { code: 422, data: { message: "User already registered" } };
    throw error;
  }
};

//  Module exports
module.exports = {
  registerNewUser: registerNewUser,
};
