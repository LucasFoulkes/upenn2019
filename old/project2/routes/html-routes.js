var path = require("path");
const fs = require('fs-extra')

module.exports = function (app) {

    app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/login.html")));
    app.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, "../public/signup.html")));
    app.get('/selfie.html', (req, res) => res.sendFile(path.join(__dirname, "../public/selfie.html")));
    app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, "../public/css/style.css")));
    app.get("/face-api.min.js", (req, res) => res.sendFile(path.join(__dirname, "../public/js/face-api.min.js")));
    app.get("/script.js", (req, res) => res.sendFile(path.join(__dirname, "../public/js/script.js")));
    app.get("/models", (req, res) => res.sendFile(path.join(__dirname, "../public/models")));
    app.get("/models", (req, res) => res.sendFile(path.join(__dirname, "../public/personal-page.html")));
    app.get("/usernames", (req, res) => {
        var users = [];
        fs.readdirSync("labeled_images/").forEach(file => { users.push(file.toString()) });
        res.json(users)
    })
};
