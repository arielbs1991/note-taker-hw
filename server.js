const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const notesArray = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
app.get("/api/notes", function(req, res){
    res.json(notesArray)
})

app.post("/api/notes", function(req, res) {
    var savedNote = req.body;
    console.log(savedNote);
    notesArray.push(savedNote);
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});