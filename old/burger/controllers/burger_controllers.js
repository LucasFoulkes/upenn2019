var express = require("express");
var burger = require('../models/burger.js')
var router = express.Router();


router.get("/", (req, res) => {
    burger.all(data => {
        var burgerObj = { burgers: data };
        res.render("index", burgerObj);
    })
});

router.get("/api/burgers", (req, res) => burger.all(data => res.json(data)));

router.post("/api/burger", (req, res) => {
    burger.all(data => {
        for (i in data) {
            if (data[i].name === req.body.burger || req.body.burger.length < 1) {
                return console.log("You alread have thar burger")
            }
        }
        burger.add(req.body.burger, result => res.json({ id: result.insertId }))
    })
});

router.put("/api/burger/:id", (req, res) => {
    burger.eat(req.params.id, result => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    }
    );
});

router.delete("/api/burger/:id", (req, res) => {
    burger.delete(req.params.id, result => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;


