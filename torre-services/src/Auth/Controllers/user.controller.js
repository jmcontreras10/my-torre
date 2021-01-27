//  Import request utility
const { requestSome } = require("../../util/requests");
//  Import UserDAO utility
const UserModel = require("../Models/User.model");

/**
 * This fetches and returns the UserBio from Torre Endpoints
 * @param {String} username
 */
const fetchUserBioHandler = (username) => {
  fetchUser(username)
    .then((userBio) => {
      //  Expected to use this method with the correct username, existenet in Torre
      res.json(userBio);
      res.status(200);
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: "An error has occourred" });
      res.status(500);
    });
};

/**
 * This verifies the user about be registered in torre and in this plataform
 * @param {Request} req
 * @param {Response} res
 */
const verifyUserHandler = (req, res) => {
  const username = req.params.username;
  fetchUser(username).then((userBio) => {
    if (userBio?.code !== "011002") {
      UserModel.findOne({ username })
        .then((fetchedUser) => {
          if (!fetchedUser) throw "You have not registered yet";
          res.json({ message: "User found!", code: 200 });
          res.status(200);
        })
        .catch(() => {
          res.json({ message: "You have not registered yet", code: 1001 });
          res.status(404);
        });
    } else {
      res.json({
        message: "The user is not registered on torre, please register",
        code: 1000,
      });
      res.status(404);
    }
  });
};

/**
 * This fetches an user Bio from Torre
 * Private
 * @param {String} username
 */
const fetchUser = async (username) => {
  return requestSome(0, `/${username}`, 0, 0, undefined, undefined);
};

/**
 * This validates if the user is registered on Torre
 * Private
 * @param {String} userName
 */
const validateUser = async (userName) => {
  try {
    const userBio = await fetchUser(userName);
    if (userBio?.code !== "011002") return true;
    return false;
  } catch (error) {
    return error;
  }
};

module.exports = {
  fetchUser: fetchUser,
  validateUser: validateUser,
  verifyUserHandler: verifyUserHandler,
  fetchUserBioHandler: fetchUserBioHandler,
};
