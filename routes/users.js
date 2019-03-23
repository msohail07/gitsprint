const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => res.send("user/routes -- failed login"));

router.get("/index", (req, res) => {
    console.log(req.user);
    res.redirect(req.baseUrl + "global/index" + req.user.username);
});

module.exports = router;