var orm = require("../config/orm.js");

var burger = {
    all: cb => orm.showTable(res => cb(res)),
    add: (burgerName, cb) => orm.addBurger(burgerName, res => cb(res)),
    eat: (Id, cb) => orm.eat(Id, res => cb(res)),
    delete: (Id, cb) => orm.delete(Id, res => cb(res))
};
module.exports = burger;