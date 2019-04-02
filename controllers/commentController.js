const Comment = require('../models/comment');
const Project = require('../models/project');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.sanitize = function(req, res, next) {
    sanitizeBody('text');
    next();
}

exports.validate = function(route) {
    switch(route) {
        case 'saveNewComment': {
            return [
                body('comment.text').not().isEmpty().withMessage('Message body is empty.').trim()
            ]
        }
    }
}

// create comment - post (create new in databases)
exports.saveComment = function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("ERRORS ISNT EMPTY")
        res.redirect('/project/' + req.params.id)
        return;
    }

    // Project.findById(req.params.id, (err, proj) => {
    //     if (err) {
    //         console.error(err);
    //         res.redirect('/' + req.user.username) // redirect to global feed
    //     } else {
    //         Comment.create(req.body.comment, (err, newComment) => {
    //             console.log('IN COMMENT.CREATE')
    //             if (err) {
    //                 console.log('IN COMMENT.CREATE.ERR')
    //                 console.log(err)
    //             } else {
    //                 console.log('IN COMMENT.CREATE.SAVING')
    //                 newComment.author.id = req.user._id
    //                 newComment.author.username = req.user.username
    //                 newComment.save()
    //                 console.log('AFTER NEWCOMMENT.SAVE')
    //                 // link comment to project document
    //                 proj.comments.push(newComment)
    //                 proj.save()
    //                 console.log('AFTER PROJ.SAVE')
    //                 res.redirect('/project/' + proj._id)
    //             }
    //         })
    //     }
    // })

    Project.findById(req.params.id, (err, proj) => {
        if (err) {
            console.error(err);
            res.redirect('/' + req.user.username) // redirect to global feed
        } else {
            comment = new Comment({
                text: req.body.comment.text,
                'author.id': req.user._id,
                'author.username': req.user.username
            });
            comment.save((err, savedComment) => {
                if (err) {
                    return console.log(err);
                } else {
                    // link new comment to project
                    proj.comments.push(savedComment)
                    proj.save()
                    res.redirect('/project/' + proj._id)
                }
            })
        }
    })
}


// delete comment - post (delete in database)

// update comment - get (show update form)

// update comment - post (post update to database)

