// ==== USER ROUTES ====
//  app.js --> app.use("/:username", userRoutes);

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

// change to use userController
// router.get("/", authMiddleware.isLoggedIn, (req, res) => {
//     res.render("global/index");
// });
router.get('/', authMiddleware.isLoggedIn, userController.getGlobal);

// router.get("/index", (req, res) => {
//     console.log(req.user);
// //    res.redirect(req.baseUrl + "global/index" + req.user.username);
//     res.render("global/index");
// });

// // change to use userController
// router.get("/profile", authMiddleware.isLoggedIn, (req, res) => {
//     res.render("users/profile");
// });
router.get('/profile', authMiddleware.isLoggedIn, userController.getUserProfile);

module.exports = router;