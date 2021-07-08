// downloads and connections
const inquirer = require("inquirer")
const mysql = require("mysql2")
const consoleTable = require('console.table');
const dbConnect = require('./db/connection');
const db = require("./db/connection.js");

// test connection
// db.query(`SELECT * FROM employee`, (err, rows) => {
//     console.log(rows);
// });
// initiate prompt when connection made 
dbConnect.connect(function(err) {
    if (err) throw err 
    console.log("successfully connected")
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([
        {
            // create prompts
        }
    ])
}