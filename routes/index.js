// ==== AUTH ROUTES ====
// login and signup routes (will call authController.js methods).

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const auth = require('../controllers/authController.js');
const gs = require('../controllers/gitsprintController.js');

// GitSprint landing page
router.get('/', gs.landing);

router.get("/home", (req, res) => res.redirect("/" + req.user.username));

router.get('/register', auth.showRegistration);

router.post('/register', auth.handleRegistration);

router.post('/login', auth.login);

router.get('/logout', auth.logout);

module.exports = router;