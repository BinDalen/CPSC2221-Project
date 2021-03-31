var mysql = require("mysql");
var fs = require("fs");
var readlineSync = require("readline-sync");

function renderProjection(table) {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);
    
        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var cols = readlineSync.question("!--> Enter fields to be retrieved (separated by commas): ");
    
            var sql = `SELECT ${cols} FROM ${table}`;
    
            con.query(sql, function(err, result, fields) {
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
            });
        });
    });
}

module.exports = {
    renderProjection
};