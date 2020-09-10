// database connection code .....

const mysql = require("mysql");

const conn = mysql.createConnection({
    // host : "172.31.12.222",
    // port : 3306,
    // database : "dsw",
    // user : "dsw_database",
    // password : "dswdsws@l"
    host : "localhost",
    // port : 3306,
    database : "dsw_latest",
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
