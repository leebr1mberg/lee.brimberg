const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("./DB/db");
const path = require('path');
// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// use static files located in 'public' dir
app.use(express.static('public/stylesheets'));
app.use(express.static('public/images'));
app.use(express.static('public/javascripts'));


// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to web course example application."
 });
});
app.get("/CV", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/CV.html'));
});

app.get("/myFirstHtml", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/myFirstHtml.html'));
});


app.get("/customers", function (req, res) {
    sql.query("SELECT * FROM customers", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
           res.status(400).send({ message: "error in getting all customers: " + err });
         return;
       }
      console.log("got all customers...");
     res.send(mysqlres);
      return;
    });
});


app.listen(8080, () => {
    console.log("Server is running on port 8080.");
})
