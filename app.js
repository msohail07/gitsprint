const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    app = express(),
    User = require("./models/user"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/users")
    port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/gitsprint", {useNewUrlParser: true});

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "SecretHashKey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // User.authenticate() method comes with passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);
app.use("/users", userRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);
// app.use("/campgrounds", campgroundRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));