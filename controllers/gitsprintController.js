const Project = require('../models/project');
const GitSprint = require('../models/gitsprint');
const moment = require('moment')


exports.landing = function(req, res) {
    res.render('landing');
}

exports.redirectHome = function(req, res) {
    res.redirect("/" + req.user.username);
}


// for lang in langArray
    // for proj in projArray
        // if lang in proj.languages:

function findMaxLangOverlapProj(projArray, langArray) {
    console.log('in findMaxLangOverlapProj')
    // var maxLangOverlapProject = projArray[0];
    // var maxLangIntersectionLen = maxLangOverlapProject.languages.filter(lang => langArray.includes(lang)).length
    var maxLangOverlapProject
    var maxLangIntersectionLen = 0
    // ERROR IS HERE
    // TODO: FIX THIS FOR LOOP.
    console.log("projArray")
    console.log(projArray)
    console.log("langArray")
    console.log(langArray)
    for (let i=0; i < projArray.length; i++) {
        proj = projArray[i]
        let intersection = proj.languages.filter(lang => langArray.includes(lang))
        console.log("intersection")
        console.log(intersection)
        if (intersection.length > maxLangIntersectionLen) {
            maxLangOverlapProject = proj
            maxLangIntersectionLen = intersection.length
        }
        console.log("maxLangOverlapProject")
        console.log(maxLangOverlapProject)
    }
    console.log('in findMaxLangOverlapProj AFTER     for (let proj in projArray)')
    return maxLangOverlapProject
}

exports.checkSprintAvailability = function(req, res, next) {
    console.log("in exports.checkSprintAvailability --------------")
    let newProj = req.gsProjArr[0];
    console.log("newProj")
    console.log(newProj)
    console.log("newProj.firstMilestone")
    console.log(newProj.firstMilestone)

    console.log("newProj.firstMilestone.date")
    console.log(newProj.firstMilestone.date)

    Project.find({_id: {$ne: newProj._id}, // not same project
                    'author.id': {$ne: newProj.author.id}, // not project of same user
                    'firstMilestone.date': {$eq: newProj.firstMilestone.date} // where firstMilestone dates match.
                })
    .then((p) => {
        console.log("Result of console.log(p) BELOW _______")
        console.log(p)
        if (p.length == 0) {
            let err = new Error('No matching projects for GitSprint creation')
            console.log(err)
            throw err
        } else if (p.length == 1) {
            req.gsProjArr.push(p[0])
        } else {
            console.log('got here in else')
            req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
            console.log('got here in else AFTER req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))')

        }
    })
    .then(() => next()) // createNewGitsprint
    .catch(() => {return res.redirect(`/${req.user.username}/profile`)})
}

function getTeamFromProjArray(projArray) {
    let team = []
    console.log("projArray ************************")
    console.log(projArray)
    console.log("projArray ************************")

    // for (let proj in projArray) {
    //     if (!(typeof(proj.author) === 'undefined')) {
    //         if (proj.author.id !== 'undefined') {
    //             team.push(proj.author.id)
    //         }
    //     }
    // }
    for (let i = 0; i < projArray.length; i++) {
        let proj = projArray[i]
        if (!(typeof(proj.author) === 'undefined')) {
            if (proj.author.id !== 'undefined') {
                team.push(proj.author.id)
            }
        }
    }
    console.log("team in getTeamFromProjArray(projArray)")
    console.log(team)
    return team
}

exports.createNewGitsprint = function(req, res) {
    console.log("IN exports.createNewGitsprint")
    let gsProjects = req.gsProjArr
    console.log('gsProjects !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(gsProjects)
    console.log('gsProjects ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    // let gsProjects = req.app.locals.gsProjArr
    let team = getTeamFromProjArray(gsProjects)
    console.log('team !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(team)
    console.log('team ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    let gs = new GitSprint({
        // teamMembers: team, // won't work.. have to push() teamMembers
        // projects: gsProjects
    })

    gs.save()
        .then(gs => {
            console.log("NEW GITSPRINT CREATED:")
            console.log(gs)
            // team.map(t => gs.teamMembers.push(t))
            team.forEach(t => gs.teamMembers.push(t))
            (gsProjects.map(proj => proj._id)).forEach(p => gs.projects.push(p))
            console.log("gs.teamMembers")
            console.log(gs.teamMembers)
            console.log("gs.projects")
            console.log(gs.projects)

            // gs.teamMembers.concat(team)
            // gs.projects.concat(gsProjects.map(proj => proj._id))
        })
        .catch(err => {
            console.error(err)
        })
    res.redirect(`/${req.user.username}/profile`)
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