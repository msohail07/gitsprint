const Project = require('../models/project');
const GitSprint = require('../models/gitsprint');
const moment = require('moment')


exports.landing = function(req, res) {
    res.render('landing');
}

exports.redirectHome = function(req, res) {
    res.redirect("/" + req.user.username);
}

function findMaxLangOverlapProj(projArray, langArray) {
    var maxLangOverlapProject = projArray[0];
    for (let proj in projArray) {
        let intersection = proj.languages.filter(lang => langArray.includes(lang))
        if (intersection.length > maxLangOverlapProject.languages.length) {maxLangOverlapProject = proj}
    }
    return maxLangOverlapProject
}

exports.checkSprintAvailability = function(req, res, next) {
    console.log("in exports.checkSprintAvailability --------------")
    // console.log(req)
    let newProj = req.gsProjArr[0];
    // console.log('newProj value below _________')
    // console.log(newProj)
    // console.log("newProj.firstMilestone.date.getDate() ___________")
    // console.log(newProj.firstMilestone.date.getDate())
    // console.log("newProj.firstMilestone.date.getMonth() ___________")
    // console.log(newProj.firstMilestone.date.getMonth())
    // console.log("newProj.firstMilestone.date.getDate() ___________")
    // console.log(newProj.firstMilestone.date.getYear())
    // let pairProject = Project.find({ 'firstMilestone.date.getDate()' : newProj.firstMilestone.date.getDate(), 'firstMilestone.date.getMonth()' : newProj.firstMilestone.date.getMonth(), 'firstMilestone.date.getYear()' : newProj.firstMilestone.date.getYear()}).exec()
    // let pairProject = Project.where('_id').ne(newProj._id)
    //                             .where('this.milestoneDate', newProj.firstMilestone.date.getDate())
    //                             .where('this.milestoneMonth', newProj.firstMilestone.date.getMonth())
    //                             .where('this.milestoneYear', newProj.firstMilestone.date.getYear());

    // let pairProject = Project.find({_id: {$ne: newProj._id}})
    //                             .then(() => {Project.findByDate(newProj.firstMilestone.date)})

    // pairProject.exec()

    // Animal.findByName('fido', function(err, animals) {
    //   console.log(animals);
    // });

    // Project.find({_id: {$ne: newProj._id}})
    // .then(() => {console.log('in project.findByDate');Project.findByDate(newProj.firstMilestone.date, function(err, p) {
    //     console.log("Result of console.log(matchingProjects) BELOW _______")
    //     console.log(p)
    //     if (p.length == 0) {
    //         let err = new Error('No matching projects for GitSprint creation')
    //         console.log(err)
    //         throw err
    //     } else if (p.length == 1) {
    //         req.gsProjArr.push(p[0])
    //     } else {
    //         req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
    //     }
    //     next()
    // })})
    // // .then(() => next()) // createNewGitsprint
    // .catch(() => {return res.redirect(`/${req.user.username}/profile`)})


    // .then((p) => {
    //     console.log("Result of console.log(p) BELOW _______")
    //     console.log(p)
    //     if (p.length == 0) {
    //         let err = new Error('No matching projects for GitSprint creation')
    //         console.log(err)
    //         throw err
    //     } else if (p.length == 1) {
    //         req.gsProjArr.push(p[0])
    //     } else {
    //         req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
    //     }
    // })
    // .then(() => next()) // createNewGitsprint
    // .catch(() => {return res.redirect(`/${req.user.username}/profile`)})
  
    // const today = moment().startOf('day')

    // MyModel.find({
    //   createdAt: {
    //     $gte: today.toDate(),
    //     $lte: moment(today).endOf('day').toDate()
    //   }
    // })
    console.log("newProj")
    console.log(newProj)

    // COMMENT START
    console.log("newProj.firstMilestone")
    console.log(newProj.firstMilestone)

    console.log("newProj.firstMilestone.date")
    console.log(newProj.firstMilestone.date)


    // let newProjfmDay = newProj.firstMilestone.date.getDate()
    // let newProjfmMonth = newProj.firstMilestone.date.getMonth() + 1
    // let newProjfmYear = newProj.firstMilestone.date.getYear() + 1900
    // console.log("DATES:::: " + newProjfmDay + " -- " + newProjfmMonth + " -- " + newProjfmYear)
    // // let newProgFirstMilestone = new Date(newProjfmYear, newProjfmMonth, newProjfmDay)
    // // let newProgFirstMilestone1 = new Date(newProjfmYear, newProjfmMonth, newProjfmDay+1)
    // var newProgMS = moment().set({'year': newProjfmYear, 'month': newProjfmMonth, 'day': newProjfmDay})
    // console.log("newProgMS")
    // // console.log(newProgMS.toDate())
    // console.log("newProgMS ^^^^^^^^^^")

    // var nextDay = JSON.parse(JSON.stringify(newProj.firstMilestone.date));


    // var nextDay = newProj.firstMilestone.date
    // nextDay = new Date(nextDay.setTime( nextDay.getTime() + 1 * 86400000 ));

    
    // Project.find({_id: {$ne: newProj._id}, 'firstMilestone.date': {'$gte': newProgMS.startOf('day').toDate(), '$lte': moment(newProgMS).endOf('day').toDate()}})
    Project.find({_id: {$ne: newProj._id},
                    'firstMilestone.date': {'$eq': newProj.firstMilestone.date}
                })
    // .then(() => {console.log('in project.findByDate');Project.findByDate(newProj.firstMilestone.date)})
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
            req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
        }
    })
    .then(() => next()) // createNewGitsprint
    .catch(() => {return res.redirect(`/${req.user.username}/profile`)})
    // COMMENT END
}

// exports.checkSprintAvailability = function(req, res, next) {
//     console.log("in exports.checkSprintAvailability --------------")
//     console.log(req)
//     let newProj = req.gsProjArr[0];
//     // let pairProject = Project.find({ 'firstMilestone.date.getDate()' : newProj.firstMilestone.date.getDate(), 'firstMilestone.date.getMonth()' : newProj.firstMilestone.date.getMonth(), 'firstMilestone.date.getYear()' : newProj.firstMilestone.date.getYear()}).exec()
//     let pairProject = Project.where('_id').ne(newProj._id)
//                                 .where('firstMilestone.date.getDate()', newProj.firstMilestone.date.getDate())
//                                 .where('firstMilestone.date.getMonth()', newProj.firstMilestone.date.getMonth())
//                                 .where('firstMilestone.date.getYear()', newProj.firstMilestone.date.getYear())
//     pairProject.exec()
//     .then((p) => {
//         console.log("p --- PPPPPPPPPPPPPPP")
//         console.log(p)
//         // if (p.length <= 1 && p[0]._id.equals(newProj._id)) {return}
//         if (p.length > 1) {
//             // find project that uses same language
//             req.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
//             // req.app.locals.gsProjArr.push(findMaxLangOverlapProj(p, newProj.languages))
//         } else {
//             req.gsProjArr.push(p[0])
//             // res.app.locals.gsProjArr.push(p[0])
//         }
//         // next()
//     })
//     .then(() => next())
//     .catch(() => {return res.redirect(`/${req.user.username}/profile`)})
// }

function getTeamFromProjArray(projArray) {
    let team = []
    console.log("projArray ************************")
    console.log(projArray)
    console.log("projArray ************************")

    for (let proj in projArray) {
        if (!(typeof(proj.author) === 'undefined')) {
            if (proj.author.id !== 'undefined') {
                team.push(proj.author.id)
            }
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
        // teamMembers: team, // won't work.. have to push() teamMembers
        // projects: gsProjects
    })

    gs.save()
        .then(gs => {
            console.log("NEW GITSPRINT CREATED:")
            console.log(gs)
            team.map(t => gs.teamMembers.push(t))
            (gsProjects.map(proj => proj._id)).map(p => gs.projects.push(p))
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