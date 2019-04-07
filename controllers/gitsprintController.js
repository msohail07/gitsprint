exports.landing = function(req, res) {
    res.render('landing');
}

exports.redirectHome = function(req, res) {
    res.redirect("/" + req.user.username);
}

exports.checkSprintAvailability = function(req, res, next) {
    //             req.projCreated = proj

    // find projects with firstMilestone.date same as req.projCreated's firstMilestone.date
        // if such projects exist
            // if more than one project
                // pair with project that uses same language
                    // if more than one project
                        // pair with project using same frameworks
                    // else return project
            // else return project
        // else return (don't call next)


    // req.partnerProj = projectFoundAbove -- then use req.projCreated and req.partnerProj to create a gitsprint
    //next()
}


// exports.createNewGitsprint =


// show gitsprint page
// exports.gitsprint_show = (req, res) => {}