const express = require("express");
const router = express.Router();
const DB = require("../db/db.js");

router.get("/api/notes", async (req, res) => {
    res.json(await DB.readNotes());
});

router.post("/api/notes", async (req, res) => {
    const newNote = req.body;
    const currentNotes = await DB.readNotes();
    await DB.writeNotes(newNote, currentNotes);
    res.json(newNote);
});

router.delete("/api/notes/:id", async (req, res) => {
    const uniqueId = parseInt(req.params.id);
    await DB.deleteNote(uniqueId);
    res.json("Note deleted");
});


module.exports = router;