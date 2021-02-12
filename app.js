const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mysqlconnection = require('./connection');
const bodyparser = require("body-parser");
var moment = require('moment');
const empty = require('is-empty');
const sequelize = require('sequelize');

app.set('view-engine', 'ejs')
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  mysqlconnection.query("SELECT * FROM meme ORDER BY date DESC, time DESC LIMIT 100 ", (err, rows, fields) => {
    if (err) {
      console.log("*************" + err)
    }else{
    students=[]
    //console.log("fields: " + fields)
    //console.log("rows: " + rows.toString())
    const user1 = []
    user1.push(rows)
    //console.log("user1: " + user1)
    //console.log(empty(rows))
    //if (empty(rows)) {
    //  res.render('degree.ejs',{message:"NO data Found"})
    //}else{
    students.push(JSON.parse(JSON.stringify(user1[0])))
    console.log("2")
    console.log(students[0][0].name)
    console.log("3")
    res.render('index.ejs',{students:students[0], n:Object.keys(students[0]).length })
    }
  })
})

//res.render('students.ejs',{students:students[0], n:Object.keys(students[0]).length })

app.post('/', (req, res) => {
  try {
    // users.push({
    //   id: Date.now().toString(),
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashedPassword
    // })
    //res.redirect('/login')
    id = moment().format("YYYY-MM-DD HH:mm:ss");
    date = id.substring(0,10)
    time = id.substring(11)      
    console.log(date);
    console.log(time);
    mysqlconnection.query("INSERT INTO meme VALUES('" + date + "','" + time + "','" + req.body.name + "','" + req.body.caption + "','" + req.body.link + "');", (err, rows, fields) => {
      if (!err) {
        console.log("data inserted");
        res.redirect('/')
      }
      else {
        console.log("Error: " + err);
        //return done(null, false, { message: 'User Already Exists' })
      }
    })
  } catch {
    console.log("caught");
    res.redirect('/')
  }
})

app.listen(4000, function () {
  console.log("Server started at PORT :4000");
})