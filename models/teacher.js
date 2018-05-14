const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const teacherSchema = mongoose.Schema({
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

teacherSchema.pre('save', function(next) {
  const teacher = this;
  if(teacher.isModified('password')) {
    bcrypt.hash(teacher.password, 10)
      .then(hashedPassword => {
        teacher.password = hashedPassword;
        next();
      }).catch(e => {
        console.log(`Teacher ${teacher} failed to hashPassword`, e);
        next();
      })
  }
})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
