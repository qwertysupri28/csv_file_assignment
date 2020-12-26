const express = require('express');
const mysql = require('mysql');
const app = express();
var fileSystem = require("fs");
var fastcsv = require("fast-csv");

app.listen(3000, () => console.log(`Listening on port 3000...`));

var pool = mysql.createPool({
    host: "localhost",
    user: "suprita",
    password: "root",
    database: "csv_file",
    port :"3306"
});

pool.getConnection(function (err, connection) {
	if (!err) {
		console.log("Database is connected ... ");
	} else {
		console.log(err,"Error connecting database ... ");
	}
});

app.get('/', async (req, res) => {
    let query = "SELECT * FROM esv_file.employee_data";
    let result = await pool.query(query);
    if (err) throw err;

    var ws = fileSystem.createWriteStream("public/data.csv");
    fastcsv
      .write(result, { headers: true })
      .on("finish", function() {
        res.send('<script>alert("Successfully Updated!")</script>');
      })
      .pipe(ws);
});