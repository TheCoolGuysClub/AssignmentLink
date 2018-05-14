const express = require(`express`);
const authRoute = express.Router();
const {body, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require(`bcryptjs`);
//local
const Teacher = require(`../models/teacher.js`);

const Grade = require(`../models/grade.js`);
authRoute.get(`/public`,(req,res)=>{
  res.render('public');
})

authRoute.get(`/register`,(req,res)=>{
  res.render(`register`);
})
authRoute.get(`/login`,(req,res)=>{
  res.render(`login`);
})

authRoute.get(`/teacher`,(req,res)=>{
  res.render(`teacher`);
})
authRoute.get(`/login`,(req,res)=>{
  res.render(`login`);
})
authRoute.post(`/register`,[
  body(`username`).isLength({min: 2})
    .withMessage(`Username must be at least 2 characters`)
  ,
  body('password').isLength({min:6})
  .withMessage(`Password must be at least 6 characters long`)
],(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errorMessages = errors.array().map(obj=>{
    return{message:obj.msg};
    })
    console.log(`errors`, errorMessages);
    req.flash(`errorMessages`,errorMessages)
    return res.redirect(`/register`);
  }
const teacherData = matchedData(req);
const teacher = new Teacher(teacherData);
teacher.save()
  .then(teacher=>{
    req.flash(`successMessage`,{message:"sign up successful!"});

    res.redirect(`/public`);
  })
  .catch(e=>{
    if(e.code === 11000){
      req.flash(`errorMessages`,{message:"This username has already registered"});
    }
    res.redirect(`/register`);
  })
})

authRoute.post('/login', (req, res) => {
  Teacher.findOne({username: req.body.username})
    .then(user => {
      if(!user) {
        req.flash('errorMessages', {message: 'This username does not exist.'});
        res.redirect('/login');
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              req.session.userId = user._id;
              console.log('userID in session:', user._id);
              req.flash('sucessMessage', {message: "login succuessful"});
              console.log(`login succuessful`);
              res.redirect('/index');
            } else {
              req.flash('errorMessages', {message: 'Invalid password'});
              console.log(`invalid password`);
              res.redirect('/login');
            }

          })
          .catch(e => {
            console.log(e);
          })
      }
    })
    .catch(e => {
      req.flash('errorMessages', {message: 'This username does not exist.'});
      res.redirect('/login');
    })
})

authRoute.post('/logout', (req, res) => {
  req.session.userId = undefined;
  res.redirect('/login');
})

authRoute.post('/addGrade/:id', (req, res) => {
  // let assignmentName = req.body.assignmentName;
  // let studentName = req.body.studentName;

  const grade = new Grade({
    assignmentName: req.body.assignmentName,
    studentName: req.body.studentName
  })
  grade.save()
    .then(grade => {
      res.redirect('/teacher')
    })
    .catch(e => {
      res.status(400).send();
    })
})


module.exports = authRoute;
