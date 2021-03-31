var mysql = require("mysql");
var fs = require("fs");

function fillTables() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));
        creds.multipleStatements = true;

        var con = mysql.createConnection(creds);

        con.connect(function(err) {
            if (err) return reject("X--> Unable to connect to server...");

            console.log("|--> Inserting data into tables...");

            var sql = `
                INSERT INTO Member VALUES('1000001', 'John Doe', 28, 'M', '7787889988', 'JohnDoe@gmail.com', 'A');
                INSERT INTO Member VALUES('1000002', 'Mary Watkins', 24, 'F', '7785773344', 'MaryWatkins@gmail.com', 'B');
                INSERT INTO Member VALUES('1000003', 'Simon Fraser', 39, 'M', '7788899988', 'SimonFraser@gmail.com', 'A');
                INSERT INTO Member VALUES('1000004', 'Agatha Thompson', 44, 'F', '7782210098', 'AgathaT@gmail.com', 'C');
                INSERT INTO Member VALUES('1000005', 'Wayne Bruce', 33, 'M', '7788780099', 'WayneBruce@gmail.com', 'C');
                
                INSERT INTO Purchase VALUES('10001', '1000004', '04/28/2020', 120);
                INSERT INTO Purchase VALUES('10002', '1000002', '05/02/2020', 250);
                INSERT INTO Purchase VALUES('10003', '1000001', '05/11/2020', 5);
                INSERT INTO Purchase VALUES('10004', '1000004', '05/13/2020', 3);
                INSERT INTO Purchase VALUES('10005', '1000003', '05/17/2020', 200);
                
                INSERT INTO Instructor VALUES('A32', 'Luke Skywalker', 25);
                INSERT INTO Instructor VALUES('C81', 'Ben Jamin', 19);
                INSERT INTO Instructor VALUES('B29', 'Tony Hawk', 42);
                INSERT INTO Instructor VALUES('A18', 'Alex zander', 33);
                INSERT INTO Instructor VALUES('C44', 'Sally Wendle', 22);
                INSERT INTO Instructor VALUES('C11', 'Devon Noved', 39);
                INSERT INTO Instructor VALUES('C88', 'Tom Brady', 42);
                
                INSERT INTO HikeLocation VALUES('Garibaldi Lake Trail', 1012, 'forest', 20, 5.5, 2);
                INSERT INTO HikeLocation VALUES('Bowen Lookout', 605, 'rocky', 12, 3.5, 1);
                INSERT INTO HikeLocation VALUES('Spirit Caves Trail', 475, 'stairway', 5, 3.5, 2);
                INSERT INTO HikeLocation VALUES('Lightning Lake Loop', 0, 'paved path', 9, 2.5, 1);
                INSERT INTO HikeLocation VALUES('Abby Grind', 330, 'forest', 4, 1.5, 2);
                
                INSERT INTO Hike VALUES('1000', '05/01/2020', 12, 3, 'Abby Grind', 'B29');
                INSERT INTO Hike VALUES('1001', '05/03/2020', 8, 5, 'Bowen Lookout', 'A18');
                INSERT INTO Hike VALUES('1002', '05/07/2020', 9, 6, 'Spirit Caves Trail', 'A32');
                INSERT INTO Hike VALUES('1003', '05/10/2020', 14, 5, 'Abby Grind', 'C44');
                INSERT INTO Hike VALUES('1004', '05/12/2020', 15, 8, 'Lightning Lake Loop', 'C81');
                
                INSERT INTO SignedUp VALUES('1000003', '1000', '04/24/2020');
                INSERT INTO SignedUp VALUES('1000001', '1004', '05/03/2020');
                INSERT INTO SignedUp VALUES('1000004', '1001', '04/23/2020');
                INSERT INTO SignedUp VALUES('1000002', '1004', '04/30/2020');
                INSERT INTO SignedUp VALUES('1000003', '1002', '05/01/2020');
                
                INSERT INTO Supervises VALUES('C81', 'A32');
                INSERT INTO Supervises VALUES('C44', 'A18');
                INSERT INTO Supervises VALUES('B29', 'A32');
                INSERT INTO Supervises VALUES('C11', 'A32');
                INSERT INTO Supervises VALUES('C88', 'B29');
            `;

            con.query(sql, function(err, result) {
                if (err) return reject("X--> Unable to insert data into tables...");

                // console.log("Rows inserted: " + result.affectedRows);
                console.log("?--> Rows inserted: " + result.length);
                return resolve();
            })
        })
    })
}

module.exports = {
    fillTables
};