DROP DATABASE IF EXISTS Bamazon;
CREATE database Bamazon;
USE Bamazon;
CREATE TABLE products (
item_id INT NOT NULL,
products_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,4) NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);
SELECT * FROM products;

/*
1,Toilet Paper,Paper Products,39.99,10
2,Nitrile Gloves,Paint,39.99,4
3,Running Shoes,Shoes,49.99,48
4,Pool Floats,Toys,1.99,101
5,Face Masks,Paint,24.99,5
6,Final Fantasy VII Remake,Games,119.99,0
7,Light Bulbs,Housewares,3.99,54
8,Google Home Mini,Tech,15.99,534
9,Blue Filter Computer Glasses,Eyeware,15.99,26
10,Jamaican Blue Mountain Coffee,Food,64.99,201
*/
