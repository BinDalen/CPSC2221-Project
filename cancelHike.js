var mysql = require("mysql");
var fs = require("fs");
var readlineSync = require("readline-sync");

function cancelHike() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var hike = readlineSync.question("Enter the hike to be cancelled: ");

            con.query(`DELETE FROM hike WHERE hikeid = ${hike}`, function(err, result) {
                if (err) return reject(err);

                console.log("Hike cancelled!");
                resolve();
            })
        })
    })
}

module.exports = {
    cancelHike
};