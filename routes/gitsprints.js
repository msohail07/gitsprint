const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const gitsprintController = require('../controllers/gitsprintController');

// specific gitsprint show page
router.get('/:id', authMiddleware.isLoggedIn, gitsprintController.showGitsprintPage)

module.exports = router