const mongoose = require('mongoose')
const Project = require('../models/project');
const Comment = require('../models/comment');
const GitSprint = require('../models/gitsprint');
// const moment = require('moment')

exports.landing = function(req, res) {
    res.render('landing');
}

exports.renderHomeGlobalIndex = function(req, res) {
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

function pushTeamMembers(teamIds, gitsprint) {
    for (let i = 0; i < teamIds.length; i++) {
        gitsprint.teamMembers.push(mongoose.Types.ObjectId(teamIds[i]))
    }
}

function pushProjects(projects, gitsprint) {
    for (let i = 0; i < projects.length; i++) {
        gitsprint.projects.push(mongoose.Types.ObjectId(projects[i]._id))
    }
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
        .then(gitsprint => {
            console.log("NEW GITSPRINT CREATED:")
            console.log(gs)
            // team.map(t => gs.teamMembers.push(t))
            // team.forEach(t => gs.teamMembers.push(t))
            pushTeamMembers(team, gitsprint)
            // (gsProjects.map(proj => proj._id)).forEach(p => gs.projects.push(p))
            pushProjects(gsProjects, gitsprint)
            // console.log("gs.teamMembers")
            // console.log(gs.teamMembers)
            // console.log("gs.projects")
            // console.log(gs.projects)
            gitsprint.save()
            return gitsprint

            // gs.teamMembers.concat(team)
            // gs.projects.concat(gsProjects.map(proj => proj._id))
        })
        .then(savedGS => {
            console.log("gs.teamMembers")
            console.log(savedGS.teamMembers)
            console.log("gs.projects")
            console.log(savedGS.projects)
        })
        .catch(err => {
            console.error(err)
        })
    res.redirect(`/${req.user.username}/profile`)
}

exports.showGitsprintPage = function(req, res) {
    GitSprint.findById(req.params.id).populate('comments').populate('projects').populate('teamMembers').exec(function(err, gitsprint) {
        if (err) {
            console.log(err)
        } else {
            res.render('gitsprints/show', {gitsprint: gitsprint})
        }
    })
}