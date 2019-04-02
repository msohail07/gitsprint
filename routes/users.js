// ==== USER ROUTES ====
//  app.js --> app.use("/:username", userRoutes);

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/', authMiddleware.isLoggedIn, userController.getGlobal);

router.get('/profile', authMiddleware.isLoggedIn, userController.getUserProfile);

module.exports = router;