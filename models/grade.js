const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const gradeSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    minLength: 1
  },
  assignmentName:{
    type:String,
    required:true,
    minLength:6
  },
  score: {
    type: Number,
    default: 100
  },
  assignmentWorth: {
    type: Number,
    required: false
  }
})

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
