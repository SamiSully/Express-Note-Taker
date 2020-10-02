const express = require("express");
const path = require("path");
const fs = require("fs");
let db = require("./db/db.json");
const app = express();
let newId = 1;

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json(db));
app.use(express.static(path.join(__dirname, "public")));
// app.post("./public/notes", (req, res) => {
//     console.log(req.body);
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
  // return response.sendFile(path.join(__dirname, "./db/db.JSON"));
});

app.post("/api/notes", function (req, res) {
  try {
    const newNotes = req.body;
    for (i = 0; i < db.length; i++) {
      newId++;
    }
    newNotes.id = newId;
    db.push(req.body);
    fs.writeFile(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(db),
      function (err) {
        if (err) throw err;
      }
    );
    res.json(req.body);
  } catch (err) {
    throw err;
  }
});

app.delete("/api/notes/:id", function (req, res) {
  try {
    db = db.filter((note) => note.id != req.params.id);
    res.json({message: 'your note was deleted!'});
    
  } catch (err) {
    throw err;
  }
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});