const express = require("express");
const router = express.Router();
const DB = require("../db/db.js");

router.get("/api/notes", async (req, res) => {
    res.json(await DB.readNotes());    
});

router.post("/api/notes", async (req, res) => {
    const newNote = req.body;
    console.log("req.body", req.body);
    const currentNotes = await DB.readNotes();
    await DB.writeNotes(newNote, currentNotes);
    res.json(newNote);
});

router.delete("/api/notes/:id", async (req, res) => {
    const uniqueId = req.params.id;
    const currentNotes = await DB.readNotes(); 
    //when uniqueId === id of currentNotes.id, remove that item from array
    // currentNotes.forEach()
    //loop over all items in array, if currentNotes at [i] = uniqueId, then delete the currentNote at that index
    const filteredNotes = currentNotes.filter(notes => {notes.id !== uniqueId});

   res.json(filteredNotes);
});


module.exports = router;