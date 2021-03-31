var mysql = require("mysql");
var fs = require("fs");
var readlineSync = require("readline-sync");

function match(table) {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var field = readlineSync.question("Enter a field to search: ");

            var value = readlineSync.question("Enter the search value: ");

            con.query(`SELECT * FROM ${table} WHERE ${field} = ${value}`, function(err, result, fields) {
                if (err) return reject("Invalid query...");
    
                var html = "<table>";
    
                html += "<tr>"
    
                fields.forEach(data => html += `<th>${data.name}</th>`);
    
                html += "</tr>";
    
                result.forEach(row => {
                    html += "<tr>";
                    for (let property in row) {
                        html += `<td>${row[property]}</td>`;
                    }
                    html += "</tr>";
                })
    
                html += "</table>";
    
                return resolve(html);
            })
        })
    })
}

module.exports = {
    match
}