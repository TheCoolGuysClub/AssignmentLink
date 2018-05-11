const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const studentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 2
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
})

studentSchema.pre('save', function(next) {
  const student = this;
  if(student.isModified('password')) {
    bcrypt.hash(student.password, 10)
      .then(hashedPassword => {
        student.password = hashedPassword;
        next();
      }).catch(e => {
        console.log(`User ${student} failed to hashPassword`, e);
        next();
      })
  }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
