// database connection code

const mysql = require("mysql");

// endpoints for the database connecting to the app
const conn = mysql.createConnection({
    // host : "sql12.freesqldatabase.com",
    // database : "sql12365117",
    // user : "sql12365117",
    // password : "KSHPDlFLrw",
    // port : 3306
    host : "localhost",
    database : "dsw_la",
    user : "root",
    password : ""
});

conn.connect( (err) =>{
    if(err){
        console.log("Databse connectionn Error ..!!!!! ");
    }
    else
        console.log("connection sucesss ... !!! ");
});

module.exports = conn;
