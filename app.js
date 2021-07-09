// downloads and connections
const inquirer = require("inquirer")
const mysql = require("mysql2")
const consoleTable = require('console.table');
const dbConnect = require('./db/connection');
const db = require("./db/connection");
// const db = require("./db/connection.js");
// const Department = require("./lib/Department");

// test connection
// db.query(`SELECT * FROM employee`, (err, rows) => {
//     console.log(rows);
// });
// initiate prompt when connection made 
dbConnect.connect(function (err) {
    if (err) throw err
    console.log("successfully connected")
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([
        {
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
                "update an employee role",
                "exit"
            ]
        }

    ]).then(function (getUserInput) {
        switch (getUserInput.choice) {
            case "view all departments":
                getAllDepartments(getUserInput);
                break;
            case "view all roles":
                getAllRoles(getUserInput);
                break;
            case "view all employees":
                getAllEmployees(getUserInput);
                break;
            case "add a department":
                addDepartment(getUserInput);
                break;
            case "add a role":
                addRole(getUserInput);
                break;
            case "add an employee":
                addEmployee(getUserInput);
                break;
            case "update an employee role":
                updateEmployeeRole(getUserInput);
                break;
            // default:
            //     dbConnect.end()
            //     process.exit(0)
            //     break;
        }

        //add a department switch case

        //add a role switch case

        // add an employee switch case

        //update an employee role switch case
    })
};

function getAllDepartments() {
    dbConnect.query("SELECT * FROM department;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

function getAllRoles() {
    dbConnect.query("SELECT * FROM role;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

function getAllEmployees() {
    dbConnect.query("SELECT * FROM employee;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the department name?"
        }
    ]).then(function (response) {
        dbConnect.query("INSERT INTO department (name) VALUES(?);", response.departmentName,
            function (err, res) {
                if (err) throw err
                console.table(res)
                startPrompt()
            })
    })
}

function addRole() {
    var dpId = []
    dbConnect.query("select id from department;", function (err, res) {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            dpId.push(res[i].id)
        }
        console.log(dpId);


        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the job title?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary?"
            },
            {
                type: "list",
                name: "departmentId",
                message: "Please select department ID",
                choices: dpId
            }
        ]).then(function (response) {
            dbConnect.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?);", [response.title, response.salary, response.departmentId],
                function (err, res) {
                    if (err) throw err
                    console.table(res)
                    startPrompt()
                })
        })
    })
}


function roleType() {
    var roleId = [];
    dbConnect.query("select title from role;", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            roleId.push(res[i].title)
        }
    })
    return roleId;
}

function addEmployee() {
    var managerId = [];
    dbConnect.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            managerId.push(res[i].first_name)
        }
        console.log(managerId);

        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter first name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter last name:"
            },
            {
                name: "role",
                type: "list",
                message: "Please enter role id:",
                choices: roleType()
            },
            {
                name: "manager",
                type: "list",
                message: "Please select manager id:",
                choices: managerId
            }

        ]).then(function (response) {
            dbConnect.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);", [response.firstName, response.lastName, response.role, response.manager],
                function (err, res) {
                    if (err) throw err
                    console.table(res)
                    startPrompt()
                })
        })
    })
}