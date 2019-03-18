const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.get('/', (req, res) => res.render("home"));

// app.use("/", indexRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);
// app.use("/campgrounds", campgroundRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));