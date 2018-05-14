const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

//locals variables
const teacher = require(`./models/teacher.js`);
const grade = require(`./models/grade.js`);
const mongoose = require(`./db/mongoose.js`);
const authRoute = require(`./routes/authRoute.js`);


const port = process.env.PORT || 3000;
const app = express();

app.set(`views`,path.join(__dirname,`views`));
app.engine(`hbs`,exphbs({defaultLayout:`main`,
                         extname:      `.hbs`}))
app.set(`view engine`,`hbs`);

  //Middleware
  app.use(session({
    //this is the string you made up
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{secure:false}
  }));

  app.use(flash());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(morgan(`dev`));
  app.use(`/`,authRoute);
  app.use((req,res,next)=>{
    //the reason why we use res
    res.locals.successMessage = req.flash(`successMessage`);
    res.locals.errorMessages = req.flash(`errorMessages`);
    next();
  })


// app.get(`/teacher`,(req,res)=>{
//   res.render(`teacher`)
// ;})

app.get(`/`,(req,res)=>{
  res.render(`index`);
})

app.listen(port,()=>{
  console.log(`Web Server up on port ${port}!`);
})
