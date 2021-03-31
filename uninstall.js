var mysql = require("mysql");
var fs = require("fs");

function dropDB() {
    var creds = JSON.parse(fs.readFileSync("credentials.json"));

    var dbName = creds.database;

    delete creds.database;

    var con = mysql.createConnection(creds);

    con.connect(function(err) {
        if (err) return console.log("Connection to server failed...");
        
        con.query(`DROP DATABASE ${dbName}`, function(err, result) {
            if (err) return console.log("X--> ailed to remove database...");
            else {
                console.log("|--> Database removed!");
                process.exit(0);
            }
        })
    })
}

dropDB();