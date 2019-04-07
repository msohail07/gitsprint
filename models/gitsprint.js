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
    timestamp: {type: Date, default: Date.now()},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("Gitsprint", gitsprintSchema)