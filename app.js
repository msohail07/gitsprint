//  --------------------
//       GITSPRINT
//  --------------------

const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    app = express(),
    User = require("./models/user"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/users")
    port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger("dev"));
app.set("view engine", "ejs");

app.use(cookieParser());
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "SecretHashKey",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

mongoose.connect("mongodb://localhost/gitsprint", {useNewUrlParser: true});
mongoose.connection.on("error", console.error.bind(console, "Mongo connection error:"));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // User.authenticate() method comes with passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add currentUser: req.user to every route using middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user; // stuff in res.locals is available in current template
    next();
});

app.use("/", indexRoutes);
// below will be : app.use("/:username", userRoutes)
// app.use("/users", userRoutes);
app.use("/:username", userRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);
// app.use("/campgrounds", campgroundRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));