var mysql = require("mysql");
var fs = require("fs");

function topWorker() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("Unable to connect to server...");

            var sql = `
                SELECT I.employeeid, I.instructor_name
                FROM instructor I
                RIGHT JOIN 
                (SELECT H.employeeid, COUNT(*)
                FROM hike H
                GROUP BY H.employeeid
                HAVING COUNT(*) = (SELECT MAX(CT)
                                    FROM (SELECT COUNT(*) AS CT
                                            FROM hike
                                            GROUP BY employeeid) C)) E
                ON I.employeeid = E.employeeid
            `;

            con.query(sql, function(err, result) {
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
    topWorker
}