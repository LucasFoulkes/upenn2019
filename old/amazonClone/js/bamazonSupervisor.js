var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var unique = [];


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer
        .prompt(
            [{
                type: "list",
                name: "commmand",
                choices: ["View Product Sales by Department", "Create New Department", "EXIT"]
            }]
        )
        .then(answers => {
            if (answers.commmand === "View Product Sales by Department") {
                viewSales();
            }
            else if (answers.commmand === "EXIT") {
                console.clear();
                process.exit();
            }
            else {
                addDepartment("")
            }
        });

}

function viewSales() {
    connection.query("select * from departments", function (err, res) {
        const table = new Table({
            head: ['DEPARTMENT_ID', 'DEPARTMENT_NAME', 'DEPARMENT_SALES', 'OVERHEAD_COST', 'TOTAL_PROFIT']
            , colWidths: [15, 20, 20, 15, 20]
        });
        if (err) throw err;
        if (res === []) {
            fill()
        } else {
            for (i in res) {
                table.push(
                    [res[i].department_id, res[i].department_name, res[i].department_sales, res[i].over_head_cost, (res[i].department_sales - res[i].over_head_cost)]
                );
            }
            console.clear()
            console.log(table.toString());
            start();
        }
    })

    function fill() {
        //if the table is empty it fills it 
        //cleans table
        connection.query('TRUNCATE TABLE departments', function (err, res) {
            if (err) throw err;
        });
        //finds unique deparment names in products, this could make use of join?
        connection.query('SELECT DISTINCT department_name FROM products', function (err, res) {
            if (err) throw err;
            for (i in res) {
                connection.query("INSERT INTO departments (department_name) VALUES (?)", [res[i].department_name], function (err, res) {
                    if (err) throw err;
                })
                connection.query("update departments set department_sales = (SELECT SUM(product_sales) FROM products where department_name = ?) where department_name = ?", [res[i].department_name, res[i].department_name], function (err, res) {
                    if (err) throw err;
                })
            }
            displayTable();
        })
    }
    function displayTable() {
        const table = new Table({
            head: ['DEPARTMENT_ID', 'DEPARTMENT_NAME', 'DEPARMENT_SALES', 'OVERHEAD_COST', 'TOTAL_PROFIT']
            , colWidths: [15, 20, 20, 15, 20]
        });
        connection.query("select * from departments", function (err, res) {
            if (err) throw err;
            for (i in res) {
                table.push(
                    [res[i].department_id, res[i].department_name, res[i].department_sales, res[i].over_head_cost, (res[i].department_sales - res[i].over_head_cost)]
                );
            }
            console.clear()
            console.log(table.toString());
            start();
        })
    }
}


function addDepartment(message) {
    console.clear()
    console.log(message)

    connection.query("select department_name from departments", function (err, res) {
        if (err) throw err;
        for (i in res) {
            unique.push(res[i].department_name)
        }
    })

    inquirer
        .prompt([
            {
                name: "name",
                message: "Department Name: ",
            },
            {
                name: "overhead",
                message: "Department Overhead Costs: ",
            }
        ])
        .then(answer => {
            if (unique.indexOf(answer.name) === -1) {
                if (answer.overhead > 0) {
                    connection.query("insert into departments (department_name, over_head_cost, department_sales) values (?, ?, 0)", [answer.name, answer.overhead], function (err, res) {
                        if (err) throw err;
                    })
                    return start();
                }
            }
            addDepartment("wrong input! try again");
        })
}
