//--------------- NPM Package Imports --------------------
const myConn = require("./server"); // mySQL database connection code will go in this file.
const bodyParser = require("body-parser");
const express = require("express");
const session = require('express-session');
//--------------------------------------------------------

//---------------- Express setups ------------------------
const app = express();
//EJS
app.set("view engine","ejs");

//setup public folder where css/js/media is present
app.use(express.static(__dirname+"/public"));

//Express Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// use sesssion ..
app.use(session({secret: 'ssshhh', saveUninitialized: true, resave: true}));
//----------------------------------------------------------

//------------------ MIDDLE WARE ---------------------------
// middleware to check if a faculty memeber is logged in                        // Middlewares go before the page routes so people can't
function isLoggedInDepartment(req, res, next)                                   // just access the dashboards without logging in.
{
  if (req.session.role == "faculty") {
    return next();                                                              // MIDDLE WARES ARE NOT IMPLEMENTED YET
  }
  res.redirect('/');
}
// middleware to check if a student is logged in
function isLoggedInStudent(req, res, next)
{
  if (req.session.role == "student") {
    return next();
  }
  res.redirect('/');
}
//----------------------------------------------------------

// -------------- STATIC WEBPAGES ROUTE ---------------------
app.get('/', function(req,res){                                                 // send login state to the static pages to abstract login.
  res.render('index',{loggedInAs : req.session.role});
});
app.get('/scholarship', function(req,res){
  res.render('scholarship',{loggedInAs : req.session.role});
});
app.get('/proctor', function(req,res){
  res.render('proctor',{loggedInAs : req.session.role});
});
app.get('/student', function(req,res){
  res.render('student',{loggedInAs : req.session.role});
});
app.get('/warden', function(req,res){
  res.render('warden',{loggedInAs : req.session.role});
});
app.get('/gallery', function(req,res){
  res.render('gallery',{loggedInAs : req.session.role});
});
//--------------------------------------------------------------

//----------------------- Dynamic Webpages Routes --------------
// login route for faculty and student.
app.post('/login/:role', (req,res) => {
    const ad_user = req.body.username;                                          // username from login form (frontend)
    const ad_pass = req.body.password;                                          // password from login form (frontend)
    var role = req.params.role;                                                 // who is logging in ? (frontend form url parameter)

    var queryString;                                                            // query to be executed depends upon who logs in.
    if(role == "student")
      queryString = "SELECT * FROM student_login WHERE registration_no = ?";
    else if(role == "faculty")
      queryString = "SELECT * FROM admin WHERE admin_user_name = ?";

    console.log(queryString + " " + ad_user + " "+ role);
    myConn.query(queryString, [ad_user], (err, results, fields) =>{             // predefined query function from "mysql" npm package
        if(err){
            console.log("Failed to fetch data from database .... !!! ");
            res.redirect("/");
            return;
        }
        console.log(results);                                                   // result : array of results retured by the query, [{}]
        if(results.length > 0)                                                  // if array length  == 0 no such username exists
        {
          if(role == "faculty")                                                 // if a faculty logs in :
          {
            if(ad_pass == results[0].admin_password)                            // validate password
            {                                                                   // IF PASSWORD MATCHES USERNAME
                console.log("login successful ... !!!!!");                      // save user credentials for the user in the current session.
                req.session.name = results[0].admin_name;
                req.session.user_id = results[0].admin_user_name;
                req.session.pass = results[0].admin_password;
                req.session.mob = results[0].admin_mobile_no;
                req.session.design = results[0].admin_designation;
                req.session.email = results[0].admin_email_id;
                req.session.role = "faculty";                                   // assign session role

                res.redirect('/departmentprofile?tab=department-profile');      // rederect to the faculty dashboard
            }
            else                                                                // Password invalid case
            {
                console.log("password invalid  ... !!!!!");
                res.redirect('/');
            }
          }
          else if(role == "student")                                            // Same process is repeated for the "Student"
          {
            if(ad_pass == results[0].student_password)
            {
                console.log("login successful ... !!!!!");
                req.session.reg_no = results[0].registration_no;
                req.session.role = "student";

                res.redirect('/studentprofile?tab=student-profile');            // redirect to Student dashboard route
            }
            else
            {
                console.log("password invalid  ... !!!!!");
                res.redirect('/');
            }
          }
        }
        else{
            console.log("user does not exsists  ... !!!!!");
            res.redirect('/');
        }
    });

});
// student dashboard route
app.get('/studentprofile', function(req,res){
  var tab_selected = req.query.tab
  if(tab_selected == "student-profile")
  {
    var query="SELECT * FROM student_information INNER JOIN student_financial_info ON student_information.registration_no = student_financial_info.registration_no INNER JOIN academic_information ON student_information.registration_no = academic_information.registration_no WHERE student_information.registration_no = '"+req.session.reg_no+"'";
    myConn.query(query, function(err, students)
    {
      if(err)
      {
          console.log(err);
          res.redirect('/');
      }
      else {
        console.log(students);
        var student = students[0];
        res.render('studentprofile', {student : student, tab : "student-profile"});
      }
    });
  }
  else if(tab_selected == "no-dues")                                            // code for "nodue" tab goes here
  {
    res.render('studentprofile', {tab : "no-due"});
  }
  else if(tab_selected == "fresh-scholarship")                                  // code for "apply scholarship" tab goes here
  {
    res.render('studentprofile', {tab : "fresh-scholarship"});
  }
  else if(tab_selected == "applied-scholarship")                                // code for "view scholarship" tab goes here
  {
    res.render('studentprofile', {tab : "applied-scholarship"});
  }
  else if(tab_selected == "renewal-scholarship")                                // code for "renewal scholarship" tab goes here
  {
    res.render('studentprofile', {tab : "renewal-scholarship"});
  }
  else if(tab_selected == "punishment-details")                                 // code for "view punishment status" tab goes here
  {
    query = "select * FROM punishment_detail where registration_no = '"+req.session.reg_no+"'";
    myConn.query(query, function(err, punishment_details)
    {
      if(err)
      {
          console.log(err);
          res.redirect('/');
      }
      else {
        console.log(punishment_details);
        res.render('studentprofile', {punishment_details : punishment_details, tab : "punishment-details"});
      }
    });
  }
});


// department dashboard route
app.get('/departmentprofile', function(req,res){
  var tab_selected = req.query.tab                                              // stores what "tab" the reqest came from the route.
  if(tab_selected == "department-profile")                                      // interact with the database based on the Frontend tab the request came from.
  {
    data = {
      name : req.session.name,
      mobile : req.session.mob,
      designation : req.session.design,
      email : req.session.email,
      loggedInAs : req.session.role,
      tab : "department-profile"
    };
    res.render('departmentprofile', data);                                      // return profile data when profile tab is selected.
  }
  else if(tab_selected == "add-punishment")                                     // Add Punishment Tab
  {
    data = {
      designation : req.session.design,
      tab : "add-punishment"
    };
    res.render('departmentprofile', data);
  }
  else if(tab_selected == "view-punishment")                                    // View Punishment Tab
  {
    data = {
      designation : req.session.design,
      tab : "view-punishment"
    };
    res.render('departmentprofile', data);
  }
  else if(tab_selected == "nodue-request")                                      // Nodues Tab
  {
    data = {
      designation : req.session.design,
      tab : "nodue-request"
    };
    res.render('departmentprofile', data);
  }
});
//--------------------- POST Route to Add punishment records -------------------
app.post('/punishment/add',function(req,res){
  var punishment_details = req.body;                                            // object of student punishment details
  console.log(punishment_details);


  res.redirect('/departmentprofile?tab=add-punishment');  // go back here when data entry is successful
});
//------------------------------------------------------------------------------
app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err){
            return console.log(err);
        }
        res.redirect('/');
    });
});

// listening on port no. to start your app.
app.listen(5222, () => {
    console.log("Server is up and listening on 5222");
});
