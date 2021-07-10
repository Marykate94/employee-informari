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
                updateEmployee(getUserInput);
                break;
             case "exit":
                 dbConnect.end()
                 console.log("Goodbye!");
                 process.exit(0)
        }
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

function addEmployee() {
    let managers = [];
    let roles = [];
    // var roleTitle = [];
    dbConnect.query("select * from role;", function (err, res) {
        // console.log({ res });
        for (let i = 0; i < res.length; i++) {
            roles.push({ id: res[i].id, title: res[i].title });
        }

        dbConnect.query("SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL;", function (err, val) {
            for (let i = 0; i < val.length; i++) {
                managers.push({ id: val[i].id, firstName: val[i].first_name });
            }
            console.log({ managers, roles });

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
                    message: "Please enter role:",
                    choices: roles.map(role => role.title)
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Please select manager:",
                    choices: managers.map(manager => manager.firstName)
                }

            ]).then(function (response) {
                const role_id = roles.find(role => role.title === response.role).id
                const manager_id = managers.find(manager => manager.firstName === response.manager).id
                dbConnect.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);", [response.firstName, response.lastName, role_id, manager_id],
                    function (err, res) {
                        if (err) throw err
                        console.table(res)
                        startPrompt()
                    })
            })
        })
    })
}

function updateEmployee() {
    let employees = [];
    let roles = [];
    dbConnect.query("SELECT * FROM employee;", function (err, res) {
        // console.table(res)
        for (let i = 0; i < res.length; i++) {
            employees.push({ id: res[i].id, first_name: res[i].first_name });
        }
        console.log(employees)

       
        dbConnect.query("SELECT * FROM role;", function (err, input) {
            for (let i = 0; i < input.length; i++) {
                roles.push({ id: input[i].id, title: input[i].title });
            }
            console.log(roles);
            inquirer.prompt([
                {
                    name: "firstName",
                    type: "list",
                    message: "Please choose employee first name:",
                    choices: employees.map(employee => employee.first_name)
                },
                {
                    name: "role",
                    type: "list",
                    message: "Please enter new role:",
                    choices: roles.map(role => role.title)
                }
            ]).then(function (response) {
                console.log(response)
                const employee_id = employees.find(employee => employee.first_name === response.firstName).id
                const role_id = roles.find(role => role.title === response.role).id
                console.log(employee_id)
                console.log(role_id)
                dbConnect.query("UPDATE employee SET role_id = ? WHERE id = ?;", [role_id, employee_id],
                function (err, res) {
                    if (err) throw err
                    console.table(res)
                    getAllEmployees()
                }
                )
               
            })
        }

        )}
    )
}