const express = require("express");
const router = express.Router({mergeParams: true});
const authMiddleware = require('../middleware/auth');
const commentController = require('../controllers/commentController');

// save new comment to DB
router.post('/', [authMiddleware.isLoggedIn, commentController.sanitize, commentController.validate('saveNewComment')], commentController.saveComment)
// router.post('/', authMiddleware.isLoggedIn, commentController.saveComment)
// router.post('/', commentController.saveComment)

// // save new project to DB
// router.post('/', [authMiddleware.isLoggedIn, projectController.sanitize, projectController.validate('saveNewProject')], projectController.saveNewProject);

// // show new project creation form
// router.get('/new', authMiddleware.isLoggedIn, projectController.newProjectForm);

// // specific project show page
// router.get('/:id', authMiddleware.isLoggedIn, projectController.showProjectPage)

module.exports = router