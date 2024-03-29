const Project = require('../models/project');
// const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// create project - get (show form)
exports.newProjectForm = function(req, res) {
    res.render('projects/new', {proj: null, errors: null});
}

exports.sanitize = function(req, res, next) {
    sanitizeBody('title');
    sanitizeBody('description');
    sanitizeBody('frameworks');
    sanitizeBody('milestone');
    next();
}

// sanitize and validation middleware will go here... then put as array in routes/projects for addNewProject post route.
exports.validate = function(route) {
    switch(route) {
        case 'saveNewProject': {
            return [
                body('title').not().isEmpty().withMessage('Title required').isLength({min: 4}).trim().withMessage('Title too short'),
                body('description').not().isEmpty().withMessage('Description required'),
                body('languages').not().isEmpty().withMessage('Must indicate at least one language'),
                // frameworks
                body('milestone').not().isEmpty().withMessage('Milestone required'),
                body('milestoneCompletionDate').not().isEmpty().withMessage('Milestone completion date required'),
                body('projCompletionDate').not().isEmpty().withMessage('Rough completion date required')
            ]
        }
    }
}

// create project - post (create new in databases)
exports.saveNewProject = function(req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let firstMilestone = {
        obj: req.body.milestone,
        date: req.body.milestoneCompletionDate
    }
    let p = new Project({
        title: req.body.title,
        description: req.body.description,
        languages: req.body.languages,
        frameworks: req.body.frameworks,
        firstMilestone: firstMilestone,
        completionDate: req.body.projCompletionDate,
        author: author,
    })

    if (!errors.isEmpty()) {
        res.render('projects/new', {proj: p, errors: errors.array({onlyFirstError: true})});
        return;
    }

    p.save()
        .then(proj => {
            req.gsProjArr = [proj]
        })
        .then(() => next())
        .catch(err => {
            console.error(err)
        })
}

exports.showProjectPage = function(req, res) {
    Project.findById(req.params.id).populate('comments').exec(function(err, proj) {
        if (err) {
            console.log(err)
        } else {
            res.render('projects/show', {proj: proj})
        }
    })
}

// delete project - post (delete in database)

// update project - get (show update form)

// update project - post (post update to database)