var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");
const chalk = require('chalk');

var connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port:0000
});

connection.connect();

var display = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(chalk.green("|----------------------------|"));
        console.log(chalk.redBright("|     Welcome To Bamazon!    |"));
        console.log(chalk.green("|----------------------------|"));
        console.log("");
        console.log(chalk.greenBright("Find Below Our Products List!"));
        console.log("");
        var table = new Table({
            head: ["Item ID", "Product", "Price", "Department", "Stock"],
            colWidths: [10, 32, 8, 18, 8],
            colAligns: ["center", "left", "right"],
            style: {
                head: ["green"],
                compact: true
            }
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].products_name, res[i].price, res[i].department_name, res[i].stock_quantity]);
        }

        console.log(chalk.red(table.toString()));
        console.log("");
        shopping();
    });
};

var shopping = function () {
    inquirer
        .prompt({
            name: "productToBuy",
            type: "input",
            message: "Please Enter The Product ID Of The Item You Wish To Purchase!"
        })
        .then(function (answer1) {
            var selection = answer1.productToBuy;
            connection.query("SELECT * FROM products WHERE item_Id=?", selection, function (
                err,
                res
            ) {
                if (err) throw err;
                if (res.length === 0) {
                    console.log(
                        "That Product Doesn't Exist, Please Enter A Product ID From The List Above!"
                    );

                    shopping();
                } else {
                    inquirer
                        .prompt({
                            name: "quantity",
                            type: "input",
                            message: "How Many Items Would You Like To Purchase?"
                        })
                        .then(function (answer2) {
                            var quantity = answer2.quantity;
                            if (quantity > res[0].stock_quantity) {
                                console.log(
                                    "Our Apologies, We Only Have " +
                                    res[0].stock_quantity +
                                    "* Left In Stock!"
                                );
                                shopping();
                            } else {
                                console.log("");
                                console.log(chalk.greenBright(res[0].products_name + " Purchased!"));
                                console.log(chalk.greenBright(quantity + " Purchased @ $" + res[0].price + "!"));

                                var newQuantity = res[0].stock_quantity - quantity;
                                connection.query(
                                    "UPDATE products SET stock_quantity = " +
                                    newQuantity +
                                    " WHERE item_id = " +
                                    res[0].item_id,
                                    function (err, resUpdate) {
                                        if (err) throw err;
                                        console.log("");
                                        console.log(chalk.redBright("Your Order has been Processed!"));
                                        console.log(chalk.redBright("Thank you for Shopping With Us!"));
                                        console.log("");
                                        connection.end();
                                    }
                                );
                            }
                        });
                }
            });
        });
};

display();
