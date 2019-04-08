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

  // assign a function to the "statics" object of our animalSchema
//   animalSchema.statics.findByName = function(name, cb) {
//     return this.find({ name: new RegExp(name, 'i') }, cb);
//   };

  projectSchema.statics.findByDate = function(date, cb) {
    console.log('Entering into projectSchema.statics.findByDate ____________')
      let d = this.firstMilestone.date.getDate()
      let m = this.firstMilestone.date.getMonth()
      let y = this.firstMilestone.date.getYear()
      console.log('in projectSchema.statics.findByDate ____________')
      console.log('Day' + d)
      console.log('Month' + m)
      console.log('Year' + y)
      return this.find({d: date.getDate(), m: date.getMonth(), y: date.getYear()}, cb)
  }


// personSchema.virtual('fullName').get(function () {
//     return this.name.first + ' ' + this.name.last;
//   });

// projectSchema.virtual('milestoneDate').get(() => {return this.firstMilestone.date.getDate()})
// projectSchema.virtual('milestoneMonth').get(() => {return this.firstMilestone.date.getMonth()})
// projectSchema.virtual('milestoneYear').get(() => {return this.firstMilestone.date.getYears()})


module.exports = mongoose.model("Project", projectSchema);

// getDay(dateOfInterest) (virtual function to help with gitsprint creation) - dateofInterest is milestone or completion date

// getWeek(dateOfInterest) (virtual function to help with gitsprint creation)

// getYear(dateOfInterest) (virtual function to help with gitsprint creation)




