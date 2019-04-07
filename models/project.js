var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    languages: {type: [String], required: true},
    frameworks: [String],
    timestamp: {type: Date, default: Date.now()},
    firstMilestone: {
        objective: String,
        date: Date,
        // day: date.getDate(),
        // year: date.getYear()
        // required: true
    },
    completionDate: {type: Date, required: true},

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

module.exports = mongoose.model("Project", projectSchema);

// getDay(dateOfInterest) (virtual function to help with gitsprint creation) - dateofInterest is milestone or completion date

// getWeek(dateOfInterest) (virtual function to help with gitsprint creation)

// getYear(dateOfInterest) (virtual function to help with gitsprint creation)