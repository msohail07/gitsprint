// routes for creating, deleting, editing projects
// CORRESPONDS TO -- // app.use("/:username/projects", projectRoutes);

const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const projectController = require('../controllers/projectController');

// router.get('/', authMiddleware.isLoggedIn, projectController.getAllProjectsForThisUserFromDB)

// router.post('/', authMiddleware.isLoggedIn, projectController.postNewProjectToDB)
router.post('/', authMiddleware.isLoggedIn, (req, res) => {res.send(req.body)});


// router.get('/new', authMiddlware.isLoggedIn, projectController.renderFormToCreateNewProject)
router.get('/new', authMiddleware.isLoggedIn, projectController.newProjectForm);

// show a specific project
// router.get('/:id', isLoggedIn, projectController.findProjByIDAndRenderProjectShowPage)

module.exports = router