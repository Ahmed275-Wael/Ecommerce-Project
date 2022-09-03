const mysql = require("mysql");

const connection = mysql.createConnection({
        host:process.env.DBHOST,
        user:process.env.DBUSER,
        password:process.env.DBPASSWORD,
        database:process.env.DBNAME

});
 
module.exports = connection;