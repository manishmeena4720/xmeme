const mysql = require("mysql");
var mysqlconnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "xmeme",
    multipleStatements : true
});

mysqlconnection.connect((err)=>{
    if(!err)
    {
        console.log("||-CONNECTED to Database: XMEME-||");
    }
    else
    {
        console.log("CONNECTION FAILED: ERROR -> "+err);
    }
});

module.exports = mysqlconnection;