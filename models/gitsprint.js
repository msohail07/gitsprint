// gitsprint model
const mongoose = require('mongoose')

var gitsprintSchema = mongoose.Schema({
    // number: {type=Number},
    teamMembers : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    projects : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    timestamp: {type: Date, default: Date.now()}
})


module.exports = mongoose.model("Gitsprint", gitsprintSchema)






/// PROJECT MODEL ---

// var mongoose = require("mongoose");

// var projectSchema = mongoose.Schema({
//     title: {type: String, required: true},
//     description: {type: String, required: true},
//     languages: {type: [String], required: true},
//     frameworks: [String],
//     timestamp: {type: Date, default: Date.now()},
//     firstMilestone: {
//         objective: String,
//         date: Date,
//         // required: true
//     },

//     author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         username: String
//     },
//     comments: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     ]
// });

// module.exports = mongoose.model("Project", projectSchema);