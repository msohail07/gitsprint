const mongoose = require('mongoose')
const Project = require('../models/project');
const Comment = require('../models/comment');
const GitSprint = require('../models/gitsprint');

exports.landing = function(req, res) {
    res.render('landing');
}

exports.renderHomeGlobalIndex = function(req, res) {
    res.redirect("/" + req.user.username);
}

function findMaxLangOverlapProj(projArray, langArray) {
    var maxLangOverlapProject
    var maxLangIntersectionLen = 0
    for (let i=0; i < projArray.length; i++) {
        proj = projArray[i]
        let intersection = proj.languages.filter(lang => langArray.includes(lang))
        if (intersection.length > maxLangIntersectionLen) {
            maxLangOverlapProject = proj
            maxLangIntersectionLen = intersection.length
        }
    }
    return maxLangOverlapProject
}

exports.checkSprintAvailability = function(req, res, next) {
    let newProj = req.gsProjArr[0];

    Project.find({_id: {$ne: newProj._id}, // not same project
                    'author.id': {$ne: newProj.author.id}, // not project of same user
                    'firstMilestone.date': {$eq: newProj.firstMilestone.date} // where firstMilestone dates match.
                })
    .then((p) => {
        if (p.length == 0) {
            throw new Error('No matching projects for GitSprint creation')
        } else if (p.length == 1) {
            req.gsProjArr.push(p[0])
        } else {
            req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
        }
    })
    .then(() => next()) // createNewGitsprint
    .catch(() => {return res.redirect(`/${req.user.username}/profile`)})
}

function getTeamFromProjArray(projArray) {
    let team = []
    for (let i = 0; i < projArray.length; i++) {
        let proj = projArray[i]
        if (!(typeof(proj.author) === 'undefined')) {
            if (proj.author.id !== 'undefined') {
                team.push(proj.author.id)
            }
        }
    }
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
    let gsProjects = req.gsProjArr
    let team = getTeamFromProjArray(gsProjects)
    let gs = new GitSprint({})

    gs.save()
        .then(gitsprint => {
            pushTeamMembers(team, gitsprint)
            pushProjects(gsProjects, gitsprint)
            gitsprint.save()
            return gitsprint
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