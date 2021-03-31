var mysql = require('mysql');
var createCon = require("./create-connection.js");
var createDB = require("./create-db.js");
var createTables = require("./create-tables.js");
var populateTables = require("./populate.js");


const initialize = () => {
    return createCon.connectTo()
        .then(() => createDB.addDBCred())
        .then(() => createTables.createTables())
        .then(() => populateTables.fillTables())
        .then(() => process.exit(0))
        .catch(err => console.log(err));
}

initialize();