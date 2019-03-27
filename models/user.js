var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    }
    // locationCity: String
    // locationState: String
    // languages: Array,
    // frameworks: Array,
    // expInYears: Number,
    // bio: String
    // projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    // gitsprint [{ type: Schema.Types.ObjectId, ref: 'GitSprint' }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);