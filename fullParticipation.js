var mysql = require("mysql");
var fs = require("fs");

function allSigned() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var sql = `
                SELECT H.hikeid
                FROM hike H
                WHERE NOT EXISTS
                ((SELECT M.membershipid FROM member M)
                EXCEPT
                (SELECT SU.membershipid
                FROM signedup SU
                WHERE SU.hikeid = H.hikeid))
            `;

            con.query(sql, function(err, result, fields) {
                if (err) return reject("Something went wrong...");

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
    allSigned
}