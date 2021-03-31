var mysql = require('mysql');
var readlineSync = require('readline-sync');
var fs = require('fs');

function addDBCred() {
    return new Promise((resolve, reject) => {
        var name = readlineSync.question("!--> Enter a name for the database: ");

        var creds = JSON.parse(fs.readFileSync("credentials.json"));
        
        var con = mysql.createConnection(creds);
        
        con.connect(function(err) {
            if (err) return reject("X--> Unable to connect to server...");
            console.log("|--> Connected to server, creating database...");
        
            con.query(`CREATE DATABASE IF NOT EXISTS ${name}`, function(err, result) {
                if (err) reject("X--> Database creation failed...");
                else {
                    creds.database = name;
        
                    fs.writeFileSync("credentials.json", JSON.stringify(creds));

                    resolve(console.log("|--> Database succesfully created..."));
                }
            });
        });
    });
}


module.exports = {
    addDBCred
};