const util = require("util");
const fs = require("fs");

const notesData = "./db/db.json";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    async writeNotes(newNote, currentNotes) {
        try {
            let note = {
                title: newNote.title,
                text: newNote.text,
                id: Date.now()
            };
            const combineNotes = [note, ...currentNotes];
            await writeFileAsync(notesData, JSON.stringify(combineNotes))
        } catch (e) {
            console.log("something went wrong while writing notesData", e);
        }
    }
    async readNotes() {
        const notesRaw = await readFileAsync(notesData, "utf8");
        try {
            return notesRaw ? JSON.parse(notesRaw) : [];
        } catch (e) {
            console.log("something went wrong while reading notesData", e)
        }
    }
    async deleteNote(uniqueId) {
        try {
            let notes = await readFileAsync(notesData, "utf8");
            let notesParsed = JSON.parse(notes);
            let filteredNotes = await notesParsed.filter(note => note.id !== uniqueId);
            await writeFileAsync(notesData, JSON.stringify(filteredNotes));
        } catch (e) {
            console.log("something went wrong while deleting from notesData")
        }
    }
}

module.exports = new DB();

// const testDB = new DB();
// testDB.writeNotes({
//     table: "todo this stuff blah blah",
//     text: "finish homework blah blah"
// });