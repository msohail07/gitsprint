const Project = require('../models/project');
const GitSprint = require('../models/gitsprint');

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
    console.log("in exports.checkSprintAvailability --------------")
    console.log(req)
    let newProj = req.gsProjArr[0];
    let pairProject = Project.find({ 'firstMilestone.date.getDate()' : newProj.firstMilestone.date.getDate(), 'firstMilestone.date.getMonth()' : newProj.firstMilestone.date.getMonth(), 'firstMilestone.date.getYear()' : newProj.firstMilestone.date.getYear()}).exec()
    pairProject
    .then((p) => {
        console.log("p --- PPPPPPPPPPPPPPP")

        console.log(p)
        if (p.length <= 1 && p[0]._id.equals(newProj._id)) {return}
        if (p.length > 1) {
            // find project that uses same language
            req.gsProjArr.push(findSameLangProj(p, newProj.languages))
            // req.app.locals.gsProjArr.push(findSameLangProj(p, newProj.languages))
        } else {
            req.gsProjArr.push(p[0])
            // res.app.locals.gsProjArr.push(p[0])
        }
        // next()
    })
    .then(() => next())
    .catch(() => {return res.redirect(`/${req.user.username}/profile`)})
}

function getTeamFromProjArray(projArray) {
    let team = []
    console.log("projArray ************************")
    console.log(projArray)
    console.log("projArray ************************")

    for (let proj in projArray) {
        if (!(typeof(proj.author) === 'undefined')) {
            team.push(proj.author.id)
        }
    }
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
        teamMembers: team,
        projects: gsProjects
    })

    gs.save()
        .then(gs => {
            console.log("NEW GITSPRINT CREATED:")
            console.log(gs)
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
