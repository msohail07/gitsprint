const Project = require('../models/project');

exports.getGlobal = function(req, res) {
    res.render('global/index');
    // get list of all projects
    // get list of all gitsprints
    // merge both lists and sort descending by timestamp
    // display on global/index page.
}


// userProfile - get (show user profile page)
exports.getUserProfile = function(req, res) {
    Project.find({ 'author.username' : req.user.username}, function(err, projects) {
        if (err) {
            console.error(err);
        } else {
            res.render('users/profile', {userProjects: projects})
        }
    })
}

// userProfile update - get (upate user profile details)

// userProfile update - post (post update to database)

// userProjects - get (show user list of projects)

// userProjects - post (create a project .. will use projectController.js)
