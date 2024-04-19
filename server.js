// imports express, path, fs, db.json, and uuid
const express = require('express');
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json');
const uuid = require('uuid');

// creates a server that listens on port 3000
const app = express();
const PORT = process.env.PORT || 3000;

//middleware to parse incoming request data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// GET * returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
// GET /notes returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

//api get route to fetch notes from db.json
app.get('/api/notes', (req, res) => res.json(dbData));

// post '/api/notes' receives new note to save on request body
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    // assigns a unique id to the new note
    newNote.id = uuid.v4();
    // adds the new note to the dbData array
    dbData.push(newNote);
    // writes the new note to db.json file
    fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
        if (err) throw err;
        res.json(newNote);
    });
});

//DELETE /api/notes/:id received query parameter containing id of note to delete
app.delete('/api/notes/:id', (req, res) => {
    const deleteID = req.params.id;
    //filter out the note with the id to delete
    dbData = dbData.filter(note => note.id !== deleteID);
    //write the filtered notes to db.json
    fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
        if (err) throw err;
        res.json({ msg: "Note deleted" });
    });
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})

