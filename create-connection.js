var mysql = require('mysql');
const readlineSync = require('readline-sync');
var fs = require('fs');

function connectTo() {
    return new Promise((resolve, reject) => {
        var creds = {};

        creds.host = readlineSync.question("!--> Enter database host: ");
        
        creds.user = readlineSync.question("!--> Enter database user: ");
        
        creds.password = readlineSync.question("!--> Enter database password: ", {
            hideEchoBack: true
        });

        var con = mysql.createConnection(creds);
        
        con.connect(function(err) {
            if (err) reject("X--> Unable to connect to server...");
            else {
                fs.writeFileSync("credentials.json", JSON.stringify(creds));
            
                console.log("|--> Connected to server...");
                
                resolve();
            }
        });
    });
}

module.exports = {
    connectTo
};