// ==== USER ROUTES ====
//  app.js --> app.use("/:username", userRoutes);

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const authMiddleware = require('../middleware/auth');

router.get("/", (req, res) => {
    res.render("global/index");
});

// router.get("/index", (req, res) => {
//     console.log(req.user);
// //    res.redirect(req.baseUrl + "global/index" + req.user.username);
//     res.render("global/index");
// });

router.get("/profile", authMiddleware.isLoggedIn, (req, res) => {
    res.render("users/profile");
});

module.exports = router;