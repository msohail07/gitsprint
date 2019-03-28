const Project = require('../models/project');
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
        case 'addNewProject': {
            return [
                body('title').not().isEmpty().withMessage('Title required').isLength({min: 4}).trim().withMessage('Title too short'),
                body('description').not().isEmpty().withMessage('Description required'),
                body('languages').not().isEmpty().withMessage('Must indicate at least one language'),
                // frameworks
                body('milestone').not().isEmpty().withMessage('Milestone required').isAlphanumeric().withMessage('Milestone must be alphanumeric only'),
                body('completionDate').exists().withMessage('Milestone completion date required')
            ]
        }
    }
}

// create project - post (create new in databases)
exports.addNewProject = function(req, res) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let firstMilestone = {
        obj: req.body.milestone,
        date: req.body.completionDate
    }
    let p = new Project({
        title: req.body.title,
        description: req.body.description,
        languages: req.body.languages,
        frameworks: req.body.frameworks,
        firstMilestone: firstMilestone,
        author: author,
    })

    if (!errors.isEmpty()) {
        console.log(errors);
        console.log("---------")
        console.log(errors.array());
        res.render('projects/new', {proj: p, errors: errors.array({onlyFirstError: true})});
        return;
    }

    p.save()
        .then(proj => {
            console.log(proj)
            res.redirect(`/${req.user.username}/profile`)
        })
        .catch(err => {
            console.error(err)
            res.ren
        })
}

// delete project - post (delete in database)

// update project - get (show update form)

// update project - post (post update to database)