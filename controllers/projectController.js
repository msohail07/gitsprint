const mongoose = require('mongoose');
const Project = require('../models/project');
const Comment = require('../models/comment');
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
                body('completionDate').exists().withMessage('Milestone completion date required')
            ]
        }
    }
}

// create project - post (create new in databases)
exports.saveNewProject = function(req, res) {
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
        res.render('project/new', {proj: p, errors: errors.array({onlyFirstError: true})});
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

// show project - get (display project show page)
    // res.render('projects/show', {proj: proj}) .. populate comments and then call exec

exports.showProjectPage = function(req, res) {
    Project.findById(req.params.id).populate('comments').exec(function(err, proj) {
        if (err) {
            console.log(err)
        } else {
            res.render('projects/show', {proj: proj})
        }
    })
}




// exports.showProjectPage = function(req, res) {
//     //     Project.findById(req.params.id).populate('comments').exec(function(err, proj) {
//     // console.log("SHOW PROJECT req.params: ============")
//     // console.log(req.params)
//     // console.log("SHOW PROJECT req: ============")
//     // console.log(req)
//     Project.findById(req.params.id).exec(function(err, proj) {
//         if (err) {
//             console.error(err)
//         } else {
//             comments = []
//             // for each commentId in proj.comments
//                 // x = Comment.findById(commentID)
//                 // get [x.text, x.author.username, x.timestamp] and insert into comments array
//             // res.render('projects/show', {proj: proj, comments: extractedComments})
//             proj.comments.forEach((commentID) => {
//                 // console.log(commentID.id.toString('hex'))
//                 Comment.findById(commentID.id.toString('hex'), 'text', (err, comment) => {
//                     if (err) {
//                         return console.log(err)
//                     } else {
//                         console.log("COMMENT:" + comment)
//                         comments.push(comment)
//                         console.log(comments)
//                     }
//                 })
//             })
//             console.log("COMMENTS EXTRACTED ARRAY:")
//             console.log(comments)
//             res.render('projects/show', {proj: proj, comments: comments})
//         }
//     })
// }