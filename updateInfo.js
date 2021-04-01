var mysql = require("mysql");
var fs = require("fs");
var readlineSync = require("readline-sync");

function update(table) {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var searchField = readlineSync.question("Enter a field to select a record: ");

            var searchKey = readlineSync.question("Enter the key of the field to select a record: ");

            var changeField = readlineSync.question("Enter the field to be changed: ");

            var changeKey = readlineSync.question("Enter a new value for the field: ");

            var sql = `UPDATE ${table} SET ${changeField} = ${changeKey} WHERE ${searchField} = ${searchKey}`;

            con.query(sql, function(err, result) {
                if (err) return reject("Unable to update record...");

                console.log("Record updated!");
                resolve();
            })
        })
    })
}

module.exports = {
    update
};