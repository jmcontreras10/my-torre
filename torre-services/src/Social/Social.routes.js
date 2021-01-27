const { Router } = require("express");

//  Controllers
const { getClosePeopleHandler } = require("./Controllers/Social.controller");

const router = Router();

//  api/social/close
router.get("/close/:username", getClosePeopleHandler);

module.exports = router;
