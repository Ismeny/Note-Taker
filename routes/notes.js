const notes = require('express').Router();
const {readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then ((data) => res.json(JSON.parse(data)))
});

//POST Route for submitting notes
notes.post('/', (req, res) => {
    //Destructuring assignment for the items in req.body
    const { title, text } = req.body
    // If all the required properties are present
    if (title && text) {
        const newNotes = 
        {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes,
        };

        readFromFile('./db/db.json').then ((data) => res.json(JSON.parse(data)))

        res.json(response);
    } else {
        res.json('Error in posting notes');
    }
});

module.exports = notes;