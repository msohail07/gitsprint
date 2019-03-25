// routes for creating, deleting, editing projects
// CORRESPONDS TO -- // app.use("/:username/projects", projectRoutes);

const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// router.get('/', authMiddleware.isLoggedIn, projectController.getAllProjectsForThisUserFromDB)

// router.post('/', authMiddleware.isLoggedIn, projectController.postNewProjectToDB)

// router.get('/new', authMiddlware.isLoggedIn, projectController.renderFormToCreateNewProject)
router.get('/new', authMiddleware.isLoggedIn, (req, res) => res.render('projects/new'));

// show a specific project
// router.get('/:id', isLoggedIn, projectController.findProjByIDAndRenderProjectShowPage)

module.exports = router