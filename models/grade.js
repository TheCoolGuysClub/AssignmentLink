const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  score: {
    type: Number,
    required: true
  },
  assignmentWorth: {
    type: Number,
    required: true
  }
})

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
