var multer = require('multer')
var mkdirp = require('mkdirp');
var path = require("path");
const fs = require('fs-extra')

module.exports = function (app) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../labeled_images'))
        },
        filename: function (req, file, cb) {
            cb(null, "1.jpg")
        }
    })
    const upload = multer({ storage: storage })
    app.post('/profile', upload.single('avatar'), function (req, res, next) {
        const dir = req.body.username.toString()
        var users = [];
        // if (dir is not in labeled images) do this else diplay user already there
        fs.readdirSync("labeled_images/").forEach(file => { users.push(file.toString()) });
        if (users.indexOf(dir) == -1) {
            mkdirp(path.join(__dirname, '../labeled_images', dir), function (err) {
                if (err) console.error(err)
                else {
                    fs.move(
                        path.join(__dirname, '../labeled_images', '1.jpg'),
                        path.join(__dirname, '../labeled_images', dir, '1.jpg'), { overwrite: true }, err => {
                            if (err) return console.error(err)
                            console.log('success!')
                        })
                }
            });
        }
        else {
            // use modals
            console.log('User name already exists')
        }
    })
};

