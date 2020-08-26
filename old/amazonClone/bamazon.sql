DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;
CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity int NULL,
    product_sales DECIMAL(10,2) NUll default 0 ,
    PRIMARY KEY (item_id)
);

 INSERT INTO products (product_name, department_name,price,stock_quantity)
    VALUES
        ("lamborgini", "cars", 10, 100),
        ("ferrary", "cars", 9, 90),
        ("mustang", "cars", 8, 80),
        ("cup", "party", 8, 80),
        ("beer", "essentials", 8, 80),
        ("vodka", "essentials", 8, 80),
        ("chicken", "food", 8, 80),
        ("food", "food", 8, 80);

USE bamazon;
CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    department_sales DECIMAL(10,2) NULL,
    over_head_cost DECIMAL(10,2) default 1000,
    PRIMARY KEY (department_id)
);

select * from departments;
TRUNCATE TABLE departments