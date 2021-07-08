// downloads and connections
const inquirer = require("inquirer")
const mysql = require("mysql2")
const consoleTable = require('console.table');
const dbConnect = require('./db/connection');
const db = require("./db/connection.js");
const Department = require("./lib/Department");

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
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]
        }

      ]).then(function(getUserInput) {
          switch(getUserInput.choice) {
            case "Department":
                getAllDepartments(getUserInput);
            break;
          }

        // view all roles switch case

        //view all employees switch case

        //add a department switch case

        //add a role switch case

        // add an employee switch case

        //update an employee role switch case
      })
    };