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