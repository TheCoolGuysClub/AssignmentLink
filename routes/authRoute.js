const express = require(`express`);
const authRoute = express.Router();
const {body, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require(`bcryptjs`);
//local
const teacher = require(`../models/teacher.js`);
const student = require(`../models/student.js`);
const grade = require(`../models/grade.js`);





module.exports = authRoute;
