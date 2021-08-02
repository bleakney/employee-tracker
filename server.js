// dependencies
const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");
const db = require("./db/connection");

const app = express();
const promptValidation = (promptAnswer) => {
  if (promptAnswer) {
    return true;
  } else {
    console.log("Please enter a valid answer!");
  }
};

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// variable declarations
const dbOptionsArray = [
  "View all departments",
  "View all roles",
  "View all employees",
  "Add a department",
  "Add a role",
  "Add an employee",
  "Update an employee role",
];

const promptUser = async () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "dbOptions",
        message: "What would you like to do?",
        choices: dbOptionsArray,
      },
    ])
    .then(({ dbOptions }) => {
      switch (dbOptions) {
        case dbOptionsArray[0]:
          // show departments table
          showDepartments();
          break;
        case dbOptionsArray[1]:
          // show roles table
          showRoles();
          break;
        case dbOptionsArray[2]:
          // show employees table
          showEmployees();
          break;
        case dbOptionsArray[3]:
          // add a department
          addDepartment();
          break;
        case dbOptionsArray[4]:
          // add a role
          addRole();
          break;
        case dbOptionsArray[5]:
          // add an employee
          addEmployee();
          break;
        case dbOptionsArray[6]:
          // update an employee's role
          updateRole();
          break;
      }
    });
};

const showDepartments = () => {
  db.query("SELECT * FROM departments", (err, result) => {
    if (err) {
      console.log(err);
    }
    const table = cTable.getTable(result);
    console.log(table);
    promptUser();
  });
};

const showRoles = () => {
  db.query("SELECT * FROM roles", (err, result) => {
    if (err) {
      console.log(err);
    }
    const table = cTable.getTable(result);
    console.log(table);
    promptUser();
  });
};

const showEmployees = () => {
  db.query(
    `SELECT a.first_name as First_Name, 
    a.last_name as Last_Name,
    roles.title AS Job_Title,
    roles.salary AS Salary,
    departments.name as Department,
    CONCAT_WS(' ', b.first_name, b.last_name) AS Manager
    FROM employees a
    JOIN roles ON a.role_id = roles.id
    JOIN departments ON roles.dept_id = departments.id
    INNER JOIN employees b ON a.manager_id = b.id`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      const table = cTable.getTable(result);
      console.log(table);
      promptUser();
    }
  );
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message:
          "Please enter a name for the department you would like to add to the database.",
        validate: (departmentName) => promptValidation(departmentName),
      },
    ])
    .then(({ departmentName }) => {
      db.query(
        "INSERT INTO departments (name) VALUES (?)",
        departmentName,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "Successfully added " + departmentName + " to the database!"
            );
            showDepartments();
          }
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message:
          "Please enter a title for the role you would like to add to the database.",
        validate: (roleTitle) => promptValidation(roleTitle),
      },
      {
        type: "number",
        name: "salary",
        message: "Please enter the salary for this role using xxxxx.xx format.",
        validate: (salary) => promptValidation(salary),
      },
      {
        type: "number",
        name: "deptId",
        message: "Please enter the department ID for this role.",
        validate: (deptId) => promptValidation(deptId),
      },
    ])
    .then((answers) => {
      let answersArray = Object.values(answers);
      db.query(
        "INSERT INTO roles (title, salary, dept_id) VALUES (?,?,?)",
        answersArray,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "Successfully added " + answersArray[0] + " to the database!"
            );
            showRoles();
          }
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the employee's first name.",
        validate: (firstName) => promptValidation(firstName),
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the employee's last name.",
        validate: (lastName) => promptValidation(lastName),
      },
      {
        type: "number",
        name: "roleId",
        message:
          "Please enter the ID number for this employee's job title.",
        validate: (roleId) => promptValidation(roleId),
      },
      {
        type: "number",
        name: "managerId",
        message:
          "Please enter the ID number of this employee's manager.",
        validate: (managerId) => promptValidation(managerId),
      },
    ])
    .then((answers) => {
      let answersArray = Object.values(answers);
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        answersArray,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "Successfully added " +
                answersArray[0] +
                " " +
                answersArray[1] +
                " to the database!"
            );
            showEmployees();
            
          }
        }
      );
    });
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "number",
        name: "employeeId",
        message:
          "Please enter the id number of the employee whose role you would like to update.",
        validate: (employeeId) => promptValidation(employeeId),
      },
      {
        type: "number",
        name: "roleId",
        message: "Please enter the id number of the employee's new role.",
        validate: (roleId) => promptValidation(roleId),
      },
    ])
    .then((answers) => {
      let answersArray = Object.values(answers);
      answersArray = answersArray.reverse();
      db.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        answersArray,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully updated the database!");
            showEmployees();
          }
        }
      );
    });
};

promptUser();
