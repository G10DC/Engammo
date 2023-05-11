const eSend = require("./utils/emailSender");
const fs = require("fs");

const customers = JSON.parse(fs.readFileSync("./src/data/customers.json"));
const randomNumber = Math.floor(Math.random() * customers.length);

const selCustomer = customers[randomNumber];
console.log(selCustomer);

eSend.sendEmail("CLAUDIO.ABAGNALE@gmail.com", selCustomer, "house to buy");
