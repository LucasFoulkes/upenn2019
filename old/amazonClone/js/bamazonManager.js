const inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  questions();
});


function questions() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'command',
      message: 'Commands',
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "EXIT"
      ]
    },])
    .then(answers => {
      switch (answers.command) {
        case "View Products for Sale":
          viewProductsSale()
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addNewProduct();
          break;
        case "EXIT":
          console.clear();
          process.exit();
          break;
      };
    });
}

function viewProductsSale() {
  console.clear()
  const table = new Table({
    head: ['ITEM_ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'STOCK']
    , colWidths: [10, 30, 30, 10, 10]
  });
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (i in res) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    console.log("--------------------------------------\n--------------------------------------")
    questions();
  });
};

function viewLowInventory() {
  console.clear()
  const table = new Table({
    head: ['ITEM_ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'STOCK']
    , colWidths: [10, 30, 30, 10, 10]
  });
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    for (i in res) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    console.log("--------------------------------------\n--------------------------------------")
    questions();
  });
};

function addInventory() {
  console.clear()
  connection.query("SELECT product_name, stock_quantity FROM products", function (err, res) {
    var list = [];
    if (err) throw err;
    for (i in res) {
      list.push(res[i].product_name + "||" + res[i].stock_quantity);
    }
    inquirer
      .prompt([{
        type: 'list',
        name: 'selection',
        message: 'Select',
        choices: list,
      },])
      .then(answers => {
        console.log('Selected:', answers.selection)
        var selection = answers.selection.split("||");
        selection = selection[0];
        inquirer
          .prompt([{
            name: 'new_number',
            message: 'add stock',
          },])
          .then(answer => {
            if (answer.new_number > 0) {
              var sql = "UPDATE products SET stock_quantity = stock_quantity + " + parseInt(answer.new_number) + " WHERE product_name = '" + selection + "'";
              connection.query(sql, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " record(s) updated");
                console.log("--------------------------------------\n--------------------------------------")
                questions();
              })
            }
            else{
              addInventory();
            }
          });
      });
  })
};

function addNewProduct() {
  console.clear()
  inquirer
    .prompt([{
      name: 'name',
      message: 'product_name',
    }, {
      type: 'list',
      name: 'dep',
      message: 'department_name',
      choices: unique,
    }, {
      name: 'price',
      message: 'price',
    }, {
      name: 'stock',
      message: 'stock_quantity',
    }])
    .then(answers => {
      var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answers.name + "', '" + answers.dep + "'," + answers.price + "," + answers.stock + ")";
      connection.query(sql, function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " record(s) updated");
        console.log("--------------------------------------\n--------------------------------------")
        questions();
      })
    });

}