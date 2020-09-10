const myConn = require("./server");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

//EJS
app.set("view engine","ejs");

//setup public folder where css is present
app.use(express.static(__dirname+"/public"));

//Express Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// -------------- STATIC WEBPAGES ROUTE ---------------------
app.get('/', function(req,res){
  res.render('index');
});
app.get('/scholarship', function(req,res){
  res.render('scholarship');
});
app.get('/proctor', function(req,res){
  res.render('proctor');
});
app.get('/student', function(req,res){
  res.render('student');
});
app.get('/warden', function(req,res){
  res.render('warder');
});
app.get('/gallery', function(req,res){
  res.render('gallery');
});
//--------------------------------------------------------------

//----------------------- Dynamic Webpages Routes --------------
app.get('/studentprofile', function(req,res){
  res.render('studentprofile');
});
app.get('/departmentprofile', function(req,res){
  res.render('departmentprofile');
});
//--------------------------------------------------------------
// listening on port no
app.listen(5222, () => {
    console.log("Server is up and listening on 5222");
});
