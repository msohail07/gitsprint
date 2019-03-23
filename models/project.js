var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var projectSchema = mongoose.Schema({
    title: String,
    description: String,
    languages: [String],
    frameworks: [String],
    timestamp: {type: Date, default: Date.now()},
    firstMilestone: {
        objective: String,
        date: Date
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

projectSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Project", projectSchema);