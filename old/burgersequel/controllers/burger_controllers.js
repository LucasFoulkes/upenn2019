var express = require("express");
var models = require('../models')
var router = express.Router();
var burgers = []

router.get('/', function (req, res) {
    models.burgers.findAll().then(data => {
        var burgerObj = { burgers: data };
        console.log(burgerObj)
        res.render('index', burgerObj);
    })
});

router.get("/api/burgers", (req, res) => models.burgers.findAll().then(data => res.json(data)));

router.post("/api/burger", function (req, res) {
    models.burgers.create(
        {
            name: req.body.burger,
            eaten: false
        }
    ).then(function () {
        res.redirect('/');
    });
});


router.put("/api/burger/:id", function (req, res) {
    models.burgers.findOne({ where: { id: req.params.id } })
        .then(function (eatenBurger) {
            eatenBurger.update({
                eaten: true,
            })
                .then(function () {
                    res.redirect('/');
                });

        });
});




module.exports = router;


