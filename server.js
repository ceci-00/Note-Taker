// imports express, path, fs, and db.json
const express = require('express');
const path = require('path');
const fs = require('fs');
const dbData = require('./db/db.json');

// creates a server that listens on port 3000
const app = express();
const PORT = process.env.PORT || 3000;

//middleware to parse incoming request data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// GET / returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
// GET /notes returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

//api get route to fetch notes from db.json
app.get('/api/notes', (req, res) => {
//read db.json file
fs.readFile(dbData, 'utf8', (error, data) => {
    if (error) {
        console.error('Error reading db.json:', error);
        res.status(500).json({ error: 'Failed to read data from database' });
        return;
    }

    try {
        res.json(JSON.parse(data));
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ error: 'Failed to parse data from the database' });
    }
});
});
// req._read(db.json)
// return all saved notes as json
readFromFile('./db/tips.json').then((dbData) => res.json(JSON.parse(dbData)));
});

// post '/api/notes' receives new note to save on request body
app.post('/api/notes', (req, res) => {
    res.send('Got a POST request')
    // adds it to db.json file
     fs.appendFile('db.json', )
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


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})

