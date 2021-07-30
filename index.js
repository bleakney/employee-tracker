// dependencies
const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");
const db = require("./db/connection");

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

const promptUser = () => {
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
          break;
        case dbOptionsArray[1]:
          //show roles table
          console.log("roles");
          break;
        case dbOptionsArray[2]:
          //show roles table
          break;
        case dbOptionsArray[3]:
          // show departments table
          break;
        case dbOptionsArray[4]:
          //show roles table
          break;
        case dbOptionsArray[5]:
          //show roles table
          break;
        case dbOptionsArray[6]:
          //show roles table
          break;
      }
    });
};

promptUser();
