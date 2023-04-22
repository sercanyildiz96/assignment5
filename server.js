/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name:Sercan Yildiz Student ID: 131043226 Date: 04/22/2023
*
*
*  Online (Cycliic) Link: https://dull-pink-katydid-gear.cyclic.app
*
********************************************************************************/ 


var httpPort = process.env.PORT || 8080;
var express = require("express");
const exphbs = require("express-handlebars");
var app = express();
const collegeData = require('./modules/collegedata.js');
const bodyParser = require("body-parser");

app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      navLink: function (url, options) {
        return (
          "<li" +
          (url == app.locals.activeRoute
            ? ' class="nav-item active" '
            : ' class="nav-item" ') +
          '><a class="nav-link" href="' +
          url +
          '">' +
          options.fn(this) +
          "</a></li>"
        );
      },
      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);
app.set("view engine", ".hbs");
app.use(express.static('public'))
app.use(function (req, res, next) {
  let route = req.path.substring(1);
  app.locals.activeRoute =
    "/" +
    (isNaN(route.split("/")[1])
      ? route.replace(/\/(?!.*)/, "")
      : route.replace(/\/(.*)/, ""));
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/htmlDemo", (req, res) => {
    res.render("htmlDemo");
});

app.get("/student/add", (req, res) => {
    res.render("addStudent");
});
  
app.post("/student/add", (req, res) => {
  return collegeData.addStudent(req.body).then((response) => {
    if (response) {
      res.redirect("/students");
    }
  }).catch((error) => {
    console.log(error)
  });
});

app.get("/students", (req, res) => {
  const courseId = parseInt(req.query.course);
  const allStudents = collegeData.getAllStudents().then((data) => {
    if (courseId) {
        collegeData.getStudentsByCourse(courseId).then((item) => {
          return res.render("students", { students: item });
        });
      } else {
        return res.render("students", {students: data});
      }
    })
    .catch((error) => {
      return res.render("students", { message: "No results returned" });
    });
});

app.get("/tas",(req,res)=>{
    collegeData.getTAs().then(taData => {
        res.send(taData);
      });
});

app.get("/courses",(req,res)=>{
    collegeData.getCourses().then(courseData => {
        return res.render("courses", { courses: courseData });
      });
});

app.get("/course/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  if (courseId) {
    collegeData.getCourseById(courseId).then((data) => {
      return res.render("course", { course: data });
    });
  } else {
    return res.send("Sorry, value is not an integer");
  }
});

app.post("/student/update", (req, res) => {
  collegeData.updateStudent(req.body);
  res.redirect("/students");
});


app.get("/students/:num", (req, res) => {
  const num = req.params.num;
  const numValue = parseInt(num);
  cd.getStudentByNum(numValue)
    .then((studentData) => {
      res.render("Student", { student: studentData });
    })
    .catch((err) => {
      res.status(404).send("PAGE NOT FOUND!!!!");
    });
});

app.get("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND!!!!");
});

app.listen(HTTP_PORT, () => {
  console.log("Server listening on port: " + HTTP_PORT);
  cd.initilize();
});
