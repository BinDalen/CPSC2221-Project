var mysql = require("mysql");
var fs = require("fs");
var readlineSync = require("readline-sync");

function selectTable() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var table = readlineSync.question("Select a table: ");

            con.query(`DESCRIBE ${table}`, function(err, result) {
                if (err) return reject("Invalid table...");

                console.log("---------------------");
                result.forEach(data => console.log(data.Field));
                console.log("---------------------");
                return resolve(table);
            })
        })
    })
}

module.exports = {
    selectTable
}