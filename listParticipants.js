var mysql = require("mysql");
var fs = require("fs");
var readlineSync = require("readline-sync");

function listHikes() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            con.query("SELECT hikeid FROM hike", function(err, result) {
                if (err) throw err;

                console.log("---------------------");
                result.forEach(row => {
                    console.log(row.hikeid);
                })
                console.log("---------------------");
                resolve();
            })
        })
    })
}

function participants() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var hikeid = readlineSync.question("Select a hike to list participants: ");

            var sql = `
                SELECT M.membershipid, M.member_name
                FROM member M
                RIGHT JOIN (SELECT membershipid
                            FROM signedup
                            WHERE hikeid = ${hikeid}) H
                ON M.membershipid = H.membershipid
            `;

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
            })
        })
    })
}

module.exports = {
    listHikes,
    participants
}