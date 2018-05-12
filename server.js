const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
// require('dotenv').config();

//locals variables
const teacher = require(`./models/teacher.js`);
const student = require(`./models/student.js`);
const grade = require(`./models/grade.js`);

const port = process.env.PORT || 3000;
const app = express();

app.set(`views`,path.join(__dirname,`views`));
app.engine(`hbs`,exphbs({defaultLayout:`main`,
                         extname:      `.hbs`}))
app.set(`view engine`,`hbs`);

app.get(`/teacher`,(req,res)=>{
  res.render(`teacher`)
;})

app.get(`/`,(req,res)=>{
  res.render(`index`);
})

app.listen(port,()=>{
  console.log(`Web Server up on port ${port}!`);
})
