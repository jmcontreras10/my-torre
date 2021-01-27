const { Router } = require("express");

//  Controllers
const { verifyUserHandler, fetchUserBioHandler } = require("./Controllers/user.controller");
const {
  registerNewUserHandler,
  loginHandler,
  getProfileHandler,
  logOut,
  logOutAll,
} = require("./Controllers/auth.controller");

//  Import middleware [Security - Done] 
const authMiddleware = require("./Middleware/auth");

const router = Router();

//  api/auth/
router.post("/", registerNewUserHandler);
router.post("/login", loginHandler);
router.get("/me", authMiddleware, getProfileHandler);
router.post("/logout", authMiddleware, logOut);
router.post("/logoutall", authMiddleware, logOutAll);

//  api/auth/val
router.get("/val/:username", verifyUserHandler);
router.get("/user/:username", fetchUserBioHandler);

module.exports = router;
