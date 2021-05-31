const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");
var http = require("http");

const PORT = process.env.PORT || 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (request, response) => {

    response.sendFile(path.join(__dirname, "Develop", "public", "assets", "notes.html"));
    console.log("Your Notes!");
})


app.get("/", (request, response) => {
   
    response.sendFile(path.join(__dirname, "Develop", "public", "assets", "index.html"));
    console.log("Your index!");
})


app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        response.json(JSON.parse(jsonString));
        
    })
})


app.post("/api/notes", function (request, response) {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
       
        var notes = JSON.parse(jsonString);

        
        const newNote = {
            title: request.body.title,
            text: request.body.text,
            
            id: Math.random().toString(36).substr(2, 9)
        };

       
        notes.push(newNote);
       
        let NotesJSON = JSON.stringify(notes);
      

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
            
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});


app.delete('/api/notes/:id', function (request, response) {

   
    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString);
        
        var notes = JSON.parse(jsonString);

        
        const newNote = {
            title: request.body.title,
            text: request.body.text,
            
            id: Math.random().toString(36).substr(2, 9)
        };

        
        notes.splice(request.params.id, 1);
       
        let NotesJSON = JSON.stringify(notes);
    

        fs.writeFile(path.join(__dirname, "db", "db.json"), NotesJSON, (err) => {
            if (err) {
                return console.log(err);
            }
           
            console.log("Success!", NotesJSON);
            return NotesJSON;
        });

    })

});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});