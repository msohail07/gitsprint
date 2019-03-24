const passport = require('passport'),
    User = require('../models/user');

// show registration form
exports.showRegistration = function(req, res) {
    res.render('register');
}

// handle registration
exports.handleRegistration = function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        console.log(`Successfully signed up ${req.body.username}`);
        passport.authenticate("local")(req, res, () => {res.redirect("/" + req.user.username)});
    });
}

// handle login
exports.login = function(req, res) {
    passport.authenticate("local",
    {successRedirect: "/home",
     failureRedirect: "/",
     failureFlash: true
    })(req, res);
}

// exports.login = function(req, res) {
//     passport.authenticate('local')(req, res),
//     (req, res) => {
//         console.log(req.user);
//         res.redirect("/users/index");
//     }
// }

// handle logout
exports.logout = function(req, res) {
    console.log(req.body);
    req.logout();
    res.redirect('/');
}