// TODO
var http = require("http");
var projection = require("./projection.js");
var findTable = require("./findTable.js");

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

findTable.selectTable()
    .then(table => projection.renderProjection(table))
    .then(data => serveHtml(data))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });