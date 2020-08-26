var connection = require("./connection.js");

var orm = {
    showTable: cb => connection.query("SELECT * FROM burgers ", (err, res) => cb(res)),

    addBurger: (burger, cb) => connection.query("INSERT INTO burgers (name) VALUES (?)", burger, (err, res) => cb(res)),

    eat: (Id, cb) => connection.query("UPDATE burgers SET eaten= true WHERE id= ?", Id, (err, res) => cb(res)),

    delete: (Id, cb) => connection.query("DELETE FROM burgers WHERE  id= ?", Id, (err, res) => cb(res))

};

module.exports = orm;