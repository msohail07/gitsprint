const express = require("express");
const router = express.Router({mergeParams: true});
const authMiddleware = require('../middleware/auth');
const commentController = require('../controllers/commentController');

// save new comment to DB
router.post('/', [authMiddleware.isLoggedIn, commentController.sanitize, commentController.validate('saveNewComment')], commentController.saveComment)


module.exports = router