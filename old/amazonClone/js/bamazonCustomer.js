var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
var moment = require("moment");
var json;
var jsonTable = [];
var quantity;
// before this global variables

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    updateLog("\n,,,new_session,,")
    getTable();
});

// this creates the list of the table
function getTable() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (i in res) {
            if (res[i].stock_quantity === 0) {
                jsonTable.push(
                    res[i].item_id + "||" +
                    res[i].product_name + "||" +
                    "out of stock")
            }
            else {
                jsonTable.push(
                    res[i].item_id + "||" +
                    res[i].product_name + "||" +
                    res[i].price)
            }
        };
        json = res;
        ask();
    });
};

// this presesnts us with the options to buy
function ask() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'product',
            message: 'what would you like to buy? \n ID, PRODUCTS, PRICE \n -------------------',
            choices: jsonTable
        },
        {
            name: 'quantity',
            message: 'how many?',
        }
        ])
        .then(function (answers) {
            quantity = answers.quantity;
            product_id = parseInt(answers.product.split("||")[0]) - 1;

            if (answers.quantity <= json[product_id].stock_quantity && answers.quantity > 0) {
                message = "you bought " + answers.quantity + " " + json[product_id].product_name + " for " + (answers.quantity * json[product_id].price);
                updateLog("\n" + moment().format('DD/MM/YYYY,hh:mm:ss') + "," + answers.product.replace(/\|\|/g, ",") + "," + answers.quantity)
                updateDb(product_id);
            } else {
                message = " wrong input or Insufficient quantity!";
            }
            inquirer
                .prompt([{
                    type: 'list',
                    name: 'selected',
                    message: message,
                    choices: ["continue shopping", "EXIT"]
                }])
                .then(function (answers) {
                    if (answers.selected === "EXIT") {
                        console.clear();
                        process.exit();
                    }
                    else {
                        console.log("--------------------------------------\n--------------------------------------")
                        getTable()
                    }
                })
        });
}

// this happens async
function updateDb(i) {
    var query =
        "UPDATE products SET stock_quantity = " + (json[i].stock_quantity - quantity) +
        ", product_sales = " + (json[i].product_sales + (json[i].price * quantity)) +
        " WHERE item_id = " + parseInt(i + 1);
    connection.query(query, function (err, result) {
        if (err) throw err;
    });
};

function updateLog(input) {
    var fs = require('fs');
    var logStream = fs.createWriteStream('log_customer.txt', { 'flags': 'a' });
    // use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
    logStream.write(input);
}