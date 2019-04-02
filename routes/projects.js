// routes for creating, deleting, editing projects
// CORRESPONDS TO -- // app.use("/:username/projects", projectRoutes);

const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const projectController = require('../controllers/projectController');

// save new project to DB
router.post('/', [authMiddleware.isLoggedIn, projectController.sanitize, projectController.validate('saveNewProject')], projectController.saveNewProject);

// show new project creation form
router.get('/new', authMiddleware.isLoggedIn, projectController.newProjectForm);

// specific project show page
router.get('/:id', authMiddleware.isLoggedIn, projectController.showProjectPage)

module.exports = router