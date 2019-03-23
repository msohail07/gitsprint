var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: {type: String, required: true},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    timestamp: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Comment", commentSchema);