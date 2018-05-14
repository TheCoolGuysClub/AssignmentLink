const express = require(`express`);
const authRoute = express.Router();
const {body, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require(`bcryptjs`);
//local
const Teacher = require(`../models/teacher.js`);
const Grade = require(`../models/grade.js`);

authRoute.get(`/register`,(req,res)=>{
  res.render(`register`);
})
authRoute.get(`/teacher`,(req,res)=>{
  res.render(`teacher`);
})

authRoute.post(`/register`,[
  body(`username`).isLength({min: 2})
    .withMessage(`UserName must be at least 2 characters`)
  ,
  body('password').isLength({min:6})
  .withMessage(`Password must be at least 6 characters long`)
],(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const errorMessages = errors.array().map(obj=>{
    return{message:obj.msg};
    })
    console.log(`errors`,errorMessages);
    req.flash(`errorMessages`,errorMessages)
    return res.redirect(`/register`);
  }
      const teacherData = matchedData(req);
      const teacher = new Teacher(teacherData);
      teacher.save()
        .then(teacher=>{
          req.flash(`successMessage`,{message:"sign up successful!"})
          res.redirect(`/teacher`);
        })
        .catch(e=>{
          if(e.code ===11000){
            req.flash(`errorMessages`,{message:"This username has already registereted"});
          }
          res.redirect(`/register`);
        })

  // console.log(errors);

})



module.exports = authRoute;
