const Project = require('../models/project');
const Gitsprint = require('../models/gitsprint');
const Comment = require('../models/comment')

exports.getGlobal = function(req, res) {
    Promise.all([Project.find(), Gitsprint.find()])
    .then(projGitsprint => {
        let [proj, gs] = projGitsprint
        res.render('global/index', {projects: proj, gitsprints: gs})
    })
    .catch(err => {
        console.error(err)
    })
}


// userProfile - get (show user profile page)
exports.getUserProfile = function(req, res) {
    Project.find({ 'author.username' : req.user.username}, function(err, projects) {
        if (err) {
            console.error(err);
        } else {
            Gitsprint.find({teamMembers : {$in : [req.user._id]}}).populate('teamMembers', 'projects').exec(function(err, gs) {
                if (err) {
                    console.error(err)
                } else {
                    res.render('users/profile', {userProjects: projects, gitsprints: gs})
                }
            })
        }
    })
}


// userProfile update - get (upate user profile details)

// userProfile update - post (post update to database)

// userProjects - get (show user list of projects)

// userProjects - post (create a project .. will use projectController.js)