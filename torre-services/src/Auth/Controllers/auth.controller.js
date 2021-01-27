//  Import User DAO
const { registerNewUser } = require("../DAOs/user.DAO");
const UserModel = require("../Models/User.model");
const { validateUser } = require("./user.controller");
const { explore } = require("../../Social/Controllers/Social.controller");

/**
 * This is the Login Handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextMiddlewareFunction} next
 */
const loginHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.json({
      internalCode: error.internalCode,
      message: error.message,
      data: undefined,
    });
    res.status(400);
  }
};

/**
 * This is the Register new user Handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextMiddlewareFunction} next
 */
const registerNewUserHandler = (req, res, next) => {
  try {
    const newUser = req.body;
    validateUser(newUser.username).then((isOnTorre) => {
      if (isOnTorre)
        registerNewUser(newUser)
          .then(async (_) => {
            const user = await UserModel.findByCredentials(
              newUser.username,
              newUser.password
            );
            const token = await user.generateAuthToken();

            //  Generated and working in background while the user continue doing things
            explore(newUser.username)
              .then(() => {
                console.log("User close social graph ready!");
              })
              .catch((error) => {
                console.log(error);
              });

            res.json({
              internalCode: 1201,
              message: "User registered!",
              data: {
                username: user.username,
                token: token,
              },
            });
            res.status(201);
          })
          .catch((error) => {
            if (error.code === 422) {
              res.json(error.data);
              res.status(error.code);
            } else {
              res.json(error);
              res.status(400);
            }
          });
      else {
        res.json({ message: "The user is not registered on torre.co" });
        res.status(400);
      }
    });
  } catch (error) {
    res.json(error);
    res.status(400);
  }
};

/**
 * This manages the main account of an user
 * @param {Request} req
 * @param {Response} res
 */
const getProfileHandler = async (req, res) => {
  res.json(req.user);
};

/**
 * This is the logout for the current token Handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextMiddlewareFunction} next
 */
const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.json({
      internalCode: 1200,
      message: "Session ended",
      data: undefined,
    });
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * This is the logout for all the current tokens available handler
 * @param {Request} req
 * @param {Response} res
 */
const logOutAll = async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registerNewUserHandler: registerNewUserHandler,
  loginHandler: loginHandler,
  getProfileHandler: getProfileHandler,
  logOut: logOut,
  logOutAll: logOutAll,
};
