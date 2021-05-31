const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
var http = require("http");

const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("Your Notes file!");
})

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "index.html"));
    console.log("Your index file!");
})

app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        response.json(JSON.parse(jsonString));
        // json.parse
    })
})

