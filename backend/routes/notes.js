const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // using the express validator
const Notes = require('../models/Notes');  // passing the Notes.js schema from models

// To fetch all the notes from the database of the user who is logged in

// Route 1: Get all the notes using GET "api/notes/fetchallnotes" : Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        // to find all the notes as per the user id
        // res.json(notes);
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: 'Internal Server Error' })
    }
});

// Route 2 : Add a new note using POST "api/notes/addNote" : Login required
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid username').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description } = req.body;
        // If there are error return bad request and the error
        const errors = validationResult(req);

        // if the errors variable is not empty means it has error then return a bad request response
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const note = new Notes({
            // This will return promise and add a new note with the corresponding value
            title, description, user: req.user.id
        })
        const saveNote = await note.save(); // This will return a note
        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: 'Internal Server Error' })
    }
});

// Route 3: Update a note using PUT "api/notes/updateNote/:id" : Login required
router.put('/updateNote/:id', fetchUser, [
    body('title', 'Enter a valid username').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description } = req.body;

    // create a new Note object
    const newNote = {};
    if (title) { newNote.title = title };  // replacing the existing title value with the updated title value
    if (description) { newNote.description = description }; // replacing the existing description value with the updated description value

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
        // note.user refers to the specific note and .toString() method is used to convert the user object to a string representation
        return res.status(404).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); // if a new content comes this will create it and update it
    res.json({ note });

});

// Route 4: Delete a note using DELETE "api/notes/deleteNote/:id" : Login required
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
        // note.user refers to the specific note and .toString() method is used to convert the user object to a string representation
        return res.status(404).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id); // Delete the note
    res.json({ "Success": "Note has been deleted", note: note });

});

module.exports = router;