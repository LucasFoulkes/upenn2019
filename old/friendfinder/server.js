var express = require("express");
var app = express();
// this is for heroku
var PORT = process.env.PORT || 8080;

// manages the json stuff
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("Listening At " + PORT);
});

