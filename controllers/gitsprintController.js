exports.landing = function(req, res) {
    res.render('landing');
}

exports.redirectHome = function(req, res) {
    res.redirect("/" + req.user.username);
}

// show gitsprint page
// exports.gitsprint_show = (req, res) => {}

// update gitsprint details
// exports.gitsprint_update = (req, res) => {}