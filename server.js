// Dependencies
const
consoleTable = require("console.table"),
inquirer     = require("inquirer"),
mysql        = require("mysql");

// Connection to sql database
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

function start() {
    inquirer
        .prompt({
            name: "selectAction",
            type: "list",
            message: "What action would you like to complete?",
            choices: ["Add an entry", "View an entry", "Update an entry"]
      })
      .then(function(answer) {
        if (answer.selectAction === "Add an entry") {
            addEntry();
        }
        else if (answer.selectAction === "View an entry") {
            viewEntry();
        } 
        else if (answer.selectAction === "Update an entry") {
            updateEntry();
        } else {
            connection.end();
        }
      });
}

// Create database records
function addEntry() {
    inquirer
        .prompt({
                name: "selectAdd",
                type: "list",
                message: "What type of entry would you like to add?",
                choices: ["Add department", "Add role", "Add employee"]
        })
        .then(function(answer) {
            if (answer.selectAdd === "Add department") {
                addDepartment();
            }
            else if (answer.selectAdd === "Add role") {
                addRole();
            }
            else if (answer.selectAdd === "Add employee") {
                addEmployee();
            } else {
                connection.end();
            }
        });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Enter the department name you would like to add:"
        })
        .then(function(answer){
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.department,
                },
                function(err) {
                    if (err) throw err;
                    console.log("Department added successfully!");
                    start();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the title of the role you would like to add:"
            },
            {
                name: "salary",
                type: "input",
                message: "Enter the salary for this role:"
            },
            {
                name: "departmentId",
                type: "input",
                message: "Enter the department ID for this role:"
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId
                },
                function(err) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    start();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter the employee's first name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter the employee's last name:"
            },
            {
                name: "roleId",
                type: "input",
                message: "Enter the employee's role ID:"
            },
            {
                name: "managerId",
                type: "input",
                message: "If any, enter the ID of the employee's manager:"
            }
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId
                },
                function(err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    start();
                }
            );
        });
}

// Read database records
function viewEntry() {
    inquirer
        .prompt({
                name: "selectView",
                type: "list",
                message: "What type of entry would you like to view?",
                choices: ["View department", "View role", "View employee"]
        })
        .then(function(answer) {
            if (answer.selectView === "View department") {
                viewDepartment();
            }
            else if (answer.selectView === "View role") {
                viewRole();
            }
            else if (answer.selectView === "View employee") {
                viewEmployee();
            } else {
                connection.end();
            }
        });
}

// Update database records

function updateEntry() {
    inquirer
        .prompt({
                name: "selectUpdate",
                type: "list",
                message: "What type of entry would you like to update?",
                choices: ["Update department", "Update role", "Update employee"]
        })
        .then(function(answer) {
            if (answer.selectUpdate === "Update department") {
                updateDepartment();
            }
            else if (answer.selectUpdate === "Update role") {
                updateRole();
            }
            else if (answer.selectUpdate === "Update employee") {
                updateEmployee();
            } else {
                connection.end();
            }
        });
}