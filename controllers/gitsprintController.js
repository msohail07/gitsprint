const Project = require('../models/project');

exports.landing = function(req, res) {
    res.render('landing');
}

exports.redirectHome = function(req, res) {
    res.redirect("/" + req.user.username);
}


// const intersection = array1.filter(element => array2.includes(element));

function findSameLangProj(projArray, langArray) {
    var maxLangOverlapProject = projArray[0];
    for (let proj in projArray) {
        let intersection = proj.languages.filter(lang => langArray.includes(lang))
        if (intersection.length > maxLangOverlapProject.languages.length) {maxLangOverlapProject = proj}
    }
    return maxLangOverlapProject
}

exports.checkSprintAvailability = function(req, res, next) {
    let newProj = req.newProj;
    let pairProject = Project.find({ 'firstMilestone.date.getDate()' : newProj.date.getDate(), 'firstMilestone.date.getMonth()' : newProj.date.getMonth(), 'firstMilestone.date.getYear()' : newProj.date.getYear()}).exec()
    pairProject
    .then((p) => {
        if (p.length > 1) {
            // find project that uses same language
            req.pairedProj = findSameLangProj(p, newProj.languages)
        } else {
            req.pairedProj = p[0]
        }
        next()
    })
    .catch(() => {return})
}



// exports.checkSprintAvailability = function(req, res, next) {

//     // find projects with firstMilestone.date same as req.newProj's firstMilestone.date
//         // if such projects exist
//             // if more than one project
//                 // pair with project that uses same language
//                     // if more than one project
//                         // pair with project using same frameworks
//                     // else return project
//             // else return project
//         // else return (don't call next)


//     // req.partnerProj = projectFoundAbove -- then use req.newProj and req.partnerProj to create a gitsprint
//     //next()
// }


// exports.createNewGitsprint =


// show gitsprint page
// exports.gitsprint_show = (req, res) => {}