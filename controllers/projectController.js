const Project = require('../models/project');

// create project - get (show form)
exports.newProjectForm = function(req, res) {
    res.render('projects/new');
}

// create project - post (create new in databases)
exports.addNewProject = function(req, res) {
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
    p.save()
        .then(proj => {
            console.log(proj)
            res.redirect(`/${req.user.username}/profile`)
        })
        .catch(err => {
            console.error(err)
        })
}

// delete project - post (delete in database)

// update project - get (show update form)

// update project - post (post update to database)