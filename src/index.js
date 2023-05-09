const eSend = require("./utils/emailSender");
const fs = require('fs')

const customers = JSON.parse(fs.readFileSync('./data/customers.json'))
const randomNumber = Math.floor(Math.random() * 20);


const selCustomer = customers[randomNumber];
console.log(selCustomer)

eSend.sendEmail('CLAUDIO@gmail.com', selCustomer, "casa da acquistare")