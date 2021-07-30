// set up dependencies
const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const db = require('./db/connection')


const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
