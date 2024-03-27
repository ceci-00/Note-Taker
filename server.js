const express = require('express');
const app = express();
const port = 3000
const dbData = require('./Develop/db/db.json');

//html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})
// get * should return index.html
app.get()

//api route
app.get('/api/notes', (req, res) => res.json(dbData))
//request should read db.json
// req._read(db.json)
// return all saved notes as json

// post '/api/notes' receives new note to save on request body
app.post('/api/notes', (req, res) => {
    res.send('Got a POST request')
    // adds it to db.json file
    // returns the new note to client
    // find way to give each note unique id when it's saved (an npm pkg can do this)
})

//DELETE /api/notes/:id received query parameter containing id of note to delete
app.delete('/api/notes/:id', (req, res) => {
    res.send('Got a DELETE request')
    //read all notes from db.json file
    // remove note w/given id property
    // rewrite notes to db.json
})
