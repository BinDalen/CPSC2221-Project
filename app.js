// TODO
var http = require("http");
var projection = require("./projection.js");
var findTable = require("./findTable.js");
var search = require("./search.js");
var list = require("./listParticipants.js");
var yargs = require("yargs");

var argv = yargs.argv;

var command = argv._[0];

function serveHtml(data) {
    var PORT = process.env.PORT || 8080;

    console.log("Result hosted at: http://localhost:" + PORT);

    http.createServer(function(req, res) {
        res.writeHead(200, {"Content-Type": "text/html"});

        res.write(`
            <html>
                <head>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                    </style>
                </head>
                <body>
                    ${data}
                </body>
            </html>
        `);

        res.end();
    }).listen(PORT);
}

switch (command) {
    case "display":
        findTable.selectTable()
            .then(table => projection.renderProjection(table))
            .then(data => serveHtml(data))
            .catch(err => {
                console.log(err);
                process.exit(1);
            });
        break;
    case "search":
        findTable.selectTable()
            .then(table => search.match(table))
            .then(data => serveHtml(data))
            .catch(err => {
                console.log(err);
                process.exit(1);
            });
        break;
    case "list":
        list.listHikes()
            .then(() => list.participants())
            .then(data => serveHtml(data))
            .catch(err => {
                console.log(err);
                process.exit(1);
            });
        break;
}
