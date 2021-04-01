var mysql = require("mysql");
var fs = require("fs");

function topMember() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var sql = `
                SELECT N.membershipid, N.member_name
                FROM member N
                RIGHT JOIN (SELECT membershipid, COUNT(*) AS CT
                            FROM signedup 
                            GROUP BY membershipid
                            HAVING CT = (SELECT MAX(SU.C) AS MX
                                        FROM (SELECT COUNT(*) AS C
                                            FROM signedup
                                            GROUP BY membershipid) SU)) T 
                ON N.membershipid = T.membershipid
            `;

            con.query(sql, function(err, result, fields) {
                if (err) return reject(err);
    
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
    topMember
};