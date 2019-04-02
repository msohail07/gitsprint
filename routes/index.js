// ==== AUTH/INDEX ROUTES ====
// login and signup routes (will call authController.js methods).

const express = require("express");
const router = express.Router();
const auth = require('../controllers/authController');
const gs = require('../controllers/gitsprintController');
const authMiddleware = require('../middleware/auth');


// GitSprint landing page
router.get('/', gs.landing);

router.get("/home", authMiddleware.isLoggedIn, gs.redirectHome);

router.get('/register', auth.showRegistration);

router.post('/register', auth.handleRegistration);

router.post('/login', auth.login);

router.get('/logout', auth.logout);

module.exports = router;