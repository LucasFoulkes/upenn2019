// i think i can get away with having all the libraries here
const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

var PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const viewsDir = path.join(__dirname, '')
app.use(express.static(viewsDir))
// not sure if im using this correctly
app.use(express.static(path.join(__dirname, 'public')))


require("./routes/html-routes")(app);
require("./routes/post-routes")(app);


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});


// ==========================================================================






