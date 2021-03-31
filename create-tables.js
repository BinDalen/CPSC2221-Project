var mysql = require("mysql");
var fs = require("fs");
const { rejects } = require("assert");

function createTables() {
    return new Promise((resolve, reject) => {
        var creds = JSON.parse(fs.readFileSync("credentials.json"));
        creds.multipleStatements = true;
    
        var con = mysql.createConnection(creds);
    
        con.connect(function(err) {
            if (err) reject("X--> Unable to connect to server...");
            console.log("|--> Creating tables...");
    
            var sql = `
            CREATE TABLE Member (
                membershipid CHAR(7),
                member_name VARCHAR(30) NOT NULL,
                age INT NOT NULL,
                gender CHAR(1) NOT NULL,
                phone CHAR(10) NOT NULL,
                email VARCHAR(30),
                membership CHAR(1) NOT NULL,
                PRIMARY KEY(membershipid)
            );
             
            CREATE TABLE Purchase (
                purchaseid CHAR(5),
                membershipid CHAR(7) NOT NULL,
                transaction_date DATE NOT NULL,
                amount INT NOT NULL,
                PRIMARY KEY(purchaseid)
            );
             
            CREATE TABLE Instructor (
                employeeid CHAR(3),
                instructor_name VARCHAR(30) NOT NULL,
                instructor_age INT NOT NULL,
                PRIMARY KEY(employeeid)
            );
             
            CREATE TABLE HikeLocation (
                location_name CHAR(30),
                elevation INT NOT NULL,
                terrain CHAR(20) NOT NULL,
                distance INT NOT NULL,
                duration FLOAT(1) NOT NULL,
                difficulty INT NOT NULL,
                PRIMARY KEY(location_name)
            );
             
            CREATE TABLE Hike (
                hikeid CHAR(4),
                hike_date DATE NOT NULL,
                start_time INT NOT NULL,
                spots_left INT NOT NULL,
                location_name CHAR(30) NOT NULL,
                employeeid CHAR(3) NOT NULL,
                PRIMARY KEY(hikeid),
                FOREIGN KEY(location_name) REFERENCES HikeLocation(location_name),
                FOREIGN KEY(employeeid) REFERENCES Instructor(employeeid)
            );
             
            CREATE TABLE SignedUp (
                membershipid CHAR(7),
                hikeid CHAR(4),
                signed_date DATE NOT NULL,
                PRIMARY KEY(membershipid, hikeid),
                FOREIGN KEY(membershipid) REFERENCES Member(membershipid),
                FOREIGN KEY(hikeid) REFERENCES Hike(hikeid)
            );
             
            CREATE TABLE Supervises (
                employeeid CHAR(3),
                supervisorid CHAR(3) NOT NULL,
                PRIMARY KEY(employeeid),
                FOREIGN KEY(employeeid) REFERENCES Instructor(employeeid),
                FOREIGN KEY(supervisorid) REFERENCES Instructor(employeeid)
            );
            `
    
            con.query(sql, function(err, result) {
                if (err) reject("X--> Tables creation failed...");
                else {
                    console.log("|--> Tables created...");
                    resolve();
                }

            });
        });
    });
}

module.exports = {
    createTables
};