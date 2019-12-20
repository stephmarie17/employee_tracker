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
getDepartmentsAsync().then(departments => {
    const choices = departments.map(({name: name, id: value}) => ({name, value}));
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
            type: "list",
            message: "Select the department for this role:",
            choices
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
});
}

function addEmployee() {
getRolesAsync().then(roles => {
    const choices = roles.map(({title: name, id: value}) => ({name, value}));
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
            type: "list",
            message: "Select the employee's role:",
            choices
        },
        {
            name: "managerId",
            type: "input",
            message: "Enter the ID of the employee's manager [if none, enter null]:"
        }
    ])
    .then(function(answer){
        connection.query(
            "INSERT INTO employees SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId.value
            },
            function(err) {
                if (err) throw err;
                console.log("Employee added successfully!");
                start();
            }
        );
    });
    })
}

// Read database records
function viewEntry() {
    inquirer
        .prompt({
                name: "selectView",
                type: "list",
                message: "What type of entry would you like to view?",
                choices: ["View all departments", "View all roles", "View all employees", "View all roles by department", "View all employees by role", "Return"]
        })
        .then(function(answer) {
            if (answer.selectView === "View all departments") {
                viewDepartments();
            }
            else if (answer.selectView === "View all roles") {
                viewRoles();
            }
            else if (answer.selectView === "View all employees") {
                viewEmployees();
            } 
            else if (answer.selectView === "View all roles by department") {
                viewByDept();
            }
            else if (answer.selectView === "View all employees by role") {
                viewByRole();
            } 
            else if (answer.selectView === "Return") {
                start();
            } else {
                connection.end();
            }
        });
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", async function(err, res) {
        try {
            if (err) throw err;
            console.table('DEPARTMENTS', res);
            await start();
        }
        catch(e) {
            console.log(e);
        }
    });
}

// Promises to store response from databases
function getDepartmentsAsync() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM departments",function(err, res) {
            if(err)
                reject(err);
            resolve(res);
        });
    });
}

function getRolesAsync() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM roles",function(err, res) {
            if(err)
                reject(err);
            resolve(res);
        });
    });
}

function getEmployeesAsync() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM employees",function(err, res) {
            if(err)
                reject(err);
            resolve(res);
        });
    });
}

function getManagerIdAsync() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT manager_id FROM employees",function(err, res) {
            if(err)
                reject(err);
            resolve(res);
        });
    });
}

function viewRoles() {
    connection.query("SELECT * FROM roles", async function(err, res) {
        try {
            if (err) throw err;
            console.table('ROLES', res);
            await start();
        }
        catch(e) {
            console.log(e);
        }
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", async function(err, res) {
        try {
            if (err) throw err;
            console.table('EMPLOYEES', res);
            await start();
        }
        catch(e) {
            console.log(e);
        }
    });
}

// BONUS FUNCTIONALITY
function viewByDept() {
// view employees in a selected department
getDepartmentsAsync().then(departments => {
    const choices = departments.map(({name: name, id: value}) => ({name, value}));
    inquirer
        .prompt({
        name: "chooseDept",
        type: "list",
        message: "From which department would you like to view the roles?",
        choices
        })
        .then(function(answer) {
        // add query to join departments and employee tables 
            let query = "SELECT * FROM roles WHERE department_id = ?";
            connection.query(query, [answer.chooseDept], async function(err, res) {
                if (err) throw err;
                try {
                    console.table("ROLES", res);
                    await start();
                }
                catch(e) {
                    console.log(e);
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
});
}

function viewByRole() {
// view employees in a selected role
getRolesAsync().then(roles => {
    const choices = roles.map(({title: name, id: value}) => ({name, value}));
    inquirer
        .prompt({
            name: "chooseRole",
            type: "list",
            message: "Select which role of which you would like to view the employees:",
            choices
            })
        .then(function(answer) {
        // add query to join departments and employee tables
            let query = "SELECT * FROM employees WHERE role_id = ?";
            connection.query(query, [answer.chooseRole], async function(err, res) {
                if (err) throw err;
                try {
                    console.table("EMPLOYEES", res);
                    await start();
                }
                catch(e) {
                    console.log(e);
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
    });
}

// Update database records

function updateEntry() {
    inquirer
        .prompt({
                name: "selectUpdate",
                type: "list",
                message: "What type of entry would you like to update?",
                choices: ["Update employee role", "Delete employee", "Delete role", "Delete department"]
        })
        .then(function(answer) {
            if (answer.selectUpdate === "Update employee role") {
                updateEmployeeRole();
            }
            else if (answer.selectUpdate === "Delete employee") {
                deleteEmployee();
            }
            else if (answer.selectUpdate === "Delete role") {
                deleteRole();
            } 
            else if (answer.selectUpdate === "Delete department") {
                deleteDept();
            }
            else {
                connection.end();
            }
        });
}

// Function to update Employee Role
async function updateEmployeeRole() {
    try {
        const employees = await getEmployeesAsync();
        const roles = await getRolesAsync();
        const choicesEmployees = employees.map(({first_name: name, id: value}) => ({name, value}));
        const choicesRoles = roles.map(({title: name, id: value}) => ({name, value}));
        inquirer
        .prompt([
            {
                name: "selectEmployee",
                type: "list",
                message: "Choose the employee whose role you would like to update:",
                choices: choicesEmployees
            },
            { 
                name: "roleUpdate",
                type: "list",
                message: "Choose the new role for the employee:",
                choices: choicesRoles
            }
        ])
        .then(function({selectEmployee, roleUpdate}) {
            connection.query("UPDATE employees SET role_id = ? WHERE id = ? ", [roleUpdate, selectEmployee], async function(err, res) {
                if (err) throw err;
                try {
                    console.log("Role successfully changed!");
                    await start();
                }
                catch(e) {
                    console.log(e);
                }
            });
        });
    }
    catch (e) {
        console.log(e);
    }
};

// BONUS FUNCTIONALITY
// Function to delete Employee
function deleteEmployee() {
getEmployeesAsync().then(employees => {
    const choices = employees.map(({id: name, id: value}) => ({name, value}));
    inquirer
    .prompt({
        name: "employeeToDelete",
        type: "list",
        message: "Select the emloyee ID of the employee you would like to delete:",
        choices
    })
    .then(function({employeeToDelete}) {
        connection.query("DELETE FROM employees WHERE id = ?", [employeeToDelete], async function(err, res) {
            if (err) throw err;
            try {
                console.log("Employee deleted!");
                await start();
            }
            catch(e) {
                console.log(e);
            }
        });
    });
});
}

// Function to delete Role
function deleteRole() {
getRolesAsync().then(roles => {
    const choices = roles.map(({title: name, id: value}) => ({name, value}));
    inquirer
    .prompt({
        name: "roleToDelete",
        type: "list",
        message: "Select the role you would liek to delete:",
        choices
    })
    .then(function({roleToDelete}) {
        connection.query("DELETE FROM roles WHERE id = ?", [roleToDelete], async function(err, res) {
            if (err) throw err;
            try {
                console.log("Role deleted!");
                await start();
            }
            catch(e) {
                console.log(e);
            }
        });
    });
});
}

// Function to delete Department
function deleteDept() {
    getDepartmentsAsync().then(departments => {
        const choices = departments.map(({name, id: value}) => ({name, value}));
        inquirer
        .prompt({
            name: "deptToDelete",
            type: "list",
            message: "Select the role you would liek to delete:",
            choices
        })
        .then(function({deptToDelete}) {
            connection.query("DELETE FROM roles WHERE id = ?", [deptToDelete], async function(err, res) {
                if (err) throw err;
                try {
                    console.log("Department deleted!");
                    await start();
                }
                catch(e) {
                    console.log(e);
                }
            });
        });
    });
}