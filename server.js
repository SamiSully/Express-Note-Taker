
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json(db));


app.post("./public/notes", (req, res) => {
    console.log(req.body);
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
